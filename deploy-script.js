import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

const PROJECT_ROOT = path.dirname(fileURLToPath(import.meta.url));
const ASTRO_CLI = path.join(PROJECT_ROOT, 'node_modules', 'astro', 'bin', 'astro.mjs');
const GH_PAGES_CLI = path.join(PROJECT_ROOT, 'node_modules', 'gh-pages', 'bin', 'gh-pages.js');
const DIST_DIR = path.join(PROJECT_ROOT, 'dist');

function runNodeScript(script, args = []) {
  execFileSync(process.execPath, [script, ...args], {
    cwd: PROJECT_ROOT,
    stdio: 'inherit',
    env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
  });
}

try {
  if (!existsSync(ASTRO_CLI) || !existsSync(GH_PAGES_CLI)) {
    throw new Error('Dependencies are missing. Run `npm ci` before deploying.');
  }

  console.log('Building the production site...');
  runNodeScript(ASTRO_CLI, ['build']);

  if (!existsSync(path.join(DIST_DIR, '.nojekyll'))) {
    throw new Error('Build output is missing dist/.nojekyll.');
  }

  console.log('Publishing dist/ to the gh-pages branch...');
  runNodeScript(GH_PAGES_CLI, ['-d', 'dist', '-b', 'gh-pages', '--dotfiles']);

  console.log('Deployment completed: https://bridgee.github.io');

} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
}
