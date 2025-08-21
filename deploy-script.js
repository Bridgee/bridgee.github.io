import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const REPO_URL = 'https://github.com/Bridgee/bridgee.github.io.git';
const TEMP_DIR = 'temp-deploy-incremental';
const DIST_DIR = 'dist';

console.log('🚀 Starting incremental deployment...');

try {
  // Clean up any existing temp directory
  if (fs.existsSync(TEMP_DIR)) {
    console.log('🧹 Cleaning up existing temp directory...');
    execSync(`rmdir /s /q "${TEMP_DIR}"`, { stdio: 'inherit' });
  }

  // Clone the gh-pages branch
  console.log('📦 Cloning gh-pages branch...');
  execSync(`git clone --depth=1 -b gh-pages "${REPO_URL}" "${TEMP_DIR}"`, { 
    stdio: 'inherit',
    env: { ...process.env, GIT_CONFIG_NOSYSTEM: '1' }
  });

  // Copy new files to temp directory (this preserves git history)
  console.log('📁 Copying new build files...');
  execSync(`xcopy /E /I /Y /Q "${DIST_DIR}\\*" "${TEMP_DIR}\\"`, { stdio: 'inherit' });

  // Ensure .nojekyll exists
  const nojekyllPath = path.join(TEMP_DIR, '.nojekyll');
  if (!fs.existsSync(nojekyllPath)) {
    fs.writeFileSync(nojekyllPath, '');
  }

  // Change to temp directory and commit changes
  process.chdir(TEMP_DIR);
  
  // Check if there are any changes
  try {
    execSync('git diff --quiet && git diff --staged --quiet');
    console.log('✅ No changes detected - site is up to date!');
    process.exit(0);
  } catch (error) {
    // Changes detected, continue with deployment
  }

  console.log('📝 Committing changes...');
  execSync('git add .', { stdio: 'inherit' });
  execSync(`git commit -m "Deploy website updates - ${new Date().toLocaleString()}"`, { stdio: 'inherit' });

  console.log('⬆️ Pushing to GitHub Pages...');
  execSync('git push origin gh-pages', { stdio: 'inherit' });

  console.log('✅ Deployment successful!');
  console.log('🌐 Site: https://bridgee.github.io');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
} finally {
  // Clean up
  process.chdir('..');
  if (fs.existsSync(TEMP_DIR)) {
    execSync(`rmdir /s /q "${TEMP_DIR}"`, { stdio: 'pipe' });
  }
}