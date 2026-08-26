import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { personal, publications, research } from '../src/data/index.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(repoRoot, 'dist');
const files = [];
const errors = [];

const walk = directory => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    entry.isDirectory() ? walk(target) : files.push(target);
  }
};
walk(distRoot);

const htmlFiles = files.filter(file => file.endsWith('.html'));
const builtText = files
  .filter(file => /\.(?:css|html|js|json|xml)$/.test(file))
  .map(file => fs.readFileSync(file, 'utf8'))
  .join('\n');
const externalReference = /^(?:(?:https?:)?\/\/|mailto:|tel:|data:|javascript:)/;
let localReferencesChecked = 0;

const pageForRoute = route => {
  const clean = route.split('#')[0].split('?')[0];
  if (clean === '/') return path.join(distRoot, 'index.html');
  const target = path.join(distRoot, clean);
  if (path.extname(clean)) return target;
  return path.join(target, 'index.html');
};

for (const file of htmlFiles) {
  const relativeFile = path.relative(distRoot, file);
  const source = fs.readFileSync(file, 'utf8');
  const ids = new Set();

  for (const match of source.matchAll(/\sid="([^"]+)"/g)) {
    if (ids.has(match[1])) errors.push(`${relativeFile} contains duplicate id="${match[1]}".`);
    ids.add(match[1]);
  }

  for (const match of source.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const raw = match[1];
    if (!raw || externalReference.test(raw)) continue;

    if (raw.startsWith('#')) {
      if (raw.length > 1 && !ids.has(decodeURIComponent(raw.slice(1)))) {
        errors.push(`${relativeFile} links to missing in-page anchor ${raw}.`);
      }
      continue;
    }

    localReferencesChecked++;
    const clean = decodeURIComponent(raw.split('#')[0].split('?')[0]);
    const target = clean.startsWith('/') ? path.join(distRoot, clean) : path.resolve(path.dirname(file), clean);
    const candidates = [target];
    if (clean.endsWith('/')) candidates.push(path.join(target, 'index.html'));
    else if (!path.extname(clean)) candidates.push(path.join(target, 'index.html'), `${target}.html`);
    if (!candidates.some(candidate => fs.existsSync(candidate))) {
      errors.push(`${relativeFile} references missing local target ${raw}.`);
    }

    const hash = raw.includes('#') ? decodeURIComponent(raw.split('#')[1]) : '';
    if (hash) {
      const targetPage = pageForRoute(clean || '/');
      if (fs.existsSync(targetPage)) {
        const targetSource = fs.readFileSync(targetPage, 'utf8');
        if (!new RegExp(`\\sid="${hash.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(targetSource)) {
          errors.push(`${relativeFile} links to missing anchor ${raw}.`);
        }
      }
    }
  }

  for (const match of source.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\salt(?:=(?:"[^"]*"|'[^']*'))?(?=\s|>)/i.test(match[0])) {
      errors.push(`${relativeFile} contains an image without alt text.`);
    }
  }


  for (const match of source.matchAll(/<iframe\b[^>]*>/gi)) {
    if (!/\stitle="[^"]+"/i.test(match[0])) {
      errors.push(`${relativeFile} contains an iframe without an accessible title.`);
    }
  }

  for (const match of source.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)) {
    if (!/\srel="[^"]*noopener[^"]*"/i.test(match[0])) errors.push(`${relativeFile} contains target="_blank" without rel="noopener".`);
  }

  if (!relativeFile.startsWith('google')) {
    if (!/<title>[^<]+<\/title>/i.test(source)) errors.push(`${relativeFile} is missing a document title.`);
    if (!/<meta name="viewport"/i.test(source)) errors.push(`${relativeFile} is missing a viewport meta tag.`);
    if (!/<meta name="description"/i.test(source)) errors.push(`${relativeFile} is missing a meta description.`);
  }

  if (/[\u3400-\u4DBF\u4E00-\u9FFF]/u.test(source)) {
    errors.push(`${relativeFile} contains non-English CJK text.`);
  }
}

const blogHtml = fs.readFileSync(pageForRoute('/blog'), 'utf8');
const gameHtml = fs.readFileSync(pageForRoute('/game'), 'utf8');
for (const [label, expected] of [
  ['current role', personal.currentRole.title],
  ['current institution', personal.currentRole.institution],
  ['lab name', research.lab.shortName],
  ['lab tagline', research.lab.tagline]
]) {
  if (!blogHtml.includes(expected)) errors.push(`Portfolio output is missing canonical ${label}: ${expected}`);
}

for (const [label, expected] of [
  ['current institution', personal.currentRole.institution],
  ['lab name', research.lab.shortName]
]) {
  if (!gameHtml.includes(expected)) errors.push(`Interactive output is missing canonical ${label}: ${expected}`);
}
if (!builtText.includes('selected publications')) {
  errors.push(`Interactive output is missing its data-driven publication browser for ${publications.length} selected publications.`);
}
if (!gameHtml.includes('id="popup"') || !gameHtml.includes('role="dialog"') || !gameHtml.includes('aria-modal="true"')) {
  errors.push('Interactive output is missing accessible dialog semantics.');
}
if (!gameHtml.includes('id="achievement"') || !gameHtml.includes('role="status"') || !gameHtml.includes('aria-live="polite"')) {
  errors.push('Interactive output is missing accessible notification semantics.');
}
if (gameHtml.includes('onclick=')) {
  errors.push('Interactive output contains inline click handlers instead of the shared action dispatcher.');
}
if (/clustrmaps|visitor_stats/i.test(builtText)) {
  errors.push('Production output still contains the retired visitor-location tracker.');
}
if (!htmlFiles.some(file => path.basename(file) === 'googleb988f0ae90c1aeb8.html')) {
  errors.push('Google Search Console verification file is missing from the production build.');
}

if (errors.length) {
  console.error(`Build validation failed with ${errors.length} issue(s):`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Build validation passed: ${htmlFiles.length} HTML files and ${localReferencesChecked} local references checked.`);
