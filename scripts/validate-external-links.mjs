import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(repoRoot, 'dist');
const timeoutMs = 20_000;
const concurrency = 4;
const restrictedStatuses = new Set([401, 403, 405, 418, 429, 999]);
const brokenStatuses = new Set([404, 410]);

if (!fs.existsSync(distRoot)) {
  console.error('External link validation requires a current dist/ build. Run npm run build first.');
  process.exit(1);
}

const htmlFiles = [];
const walk = directory => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    entry.isDirectory() ? walk(target) : target.endsWith('.html') && htmlFiles.push(target);
  }
};
walk(distRoot);

const sourcesByUrl = new Map();
for (const file of htmlFiles) {
  const source = fs.readFileSync(file, 'utf8');
  for (const match of source.matchAll(/\s(?:href|src|data-widget-src)="(https?:\/\/[^"#]+)(?:#[^"]*)?"/gi)) {
    const url = match[1].replaceAll('&amp;', '&');
    if (!sourcesByUrl.has(url)) sourcesByUrl.set(url, new Set());
    sourcesByUrl.get(url).add(path.relative(distRoot, file));
  }
}

const urls = [...sourcesByUrl.keys()].sort();
const results = [];

const check = async url => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(timeoutMs),
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; BridgeHomepageLinkCheck/1.0; +https://bridgee.github.io/)'
      }
    });

    const status = response.status;
    const category = brokenStatuses.has(status)
      ? 'broken'
      : restrictedStatuses.has(status)
        ? 'restricted'
        : status >= 500
          ? 'transient'
          : status >= 400
            ? 'broken'
            : 'ok';

    return {
      url,
      status,
      category,
      finalUrl: response.url,
      sources: [...sourcesByUrl.get(url)]
    };
  } catch (error) {
    return {
      url,
      status: null,
      category: 'network-error',
      error: error instanceof Error ? error.message : String(error),
      sources: [...sourcesByUrl.get(url)]
    };
  }
};

let cursor = 0;
const worker = async () => {
  while (cursor < urls.length) {
    const index = cursor++;
    results[index] = await check(urls[index]);
  }
};
await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, worker));

for (const result of results) {
  const status = result.status ?? result.error;
  const redirect = result.finalUrl && result.finalUrl !== result.url ? ` -> ${result.finalUrl}` : '';
  console.log(`[${result.category.toUpperCase()}] ${status} ${result.url}${redirect}`);
}

const broken = results.filter(result => result.category === 'broken');
const inconclusive = results.filter(result => ['restricted', 'transient', 'network-error'].includes(result.category));

console.log(`\nChecked ${results.length} unique external URLs: ${results.length - broken.length - inconclusive.length} reachable, ${inconclusive.length} inconclusive, ${broken.length} broken.`);

if (inconclusive.length) {
  console.log('Inconclusive URLs require browser verification because the remote service restricted or interrupted automated requests.');
}

if (broken.length) {
  console.error('Broken external URLs:');
  for (const result of broken) {
    console.error(`- ${result.url} (used by ${result.sources.join(', ')})`);
  }
  process.exit(1);
}
