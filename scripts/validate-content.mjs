import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  gameData,
  modeConfig,
  personal,
  projects,
  publications,
  research,
  siteConfig
} from '../src/data/index.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = path.join(repoRoot, 'public');
const errors = [];

const assert = (condition, message) => {
  if (!condition) errors.push(message);
};

const assertUnique = (values, label) => {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  assert(duplicates.length === 0, `${label} must be unique: ${[...new Set(duplicates)].join(', ')}`);
};

const assertLocalAsset = (url, label) => {
  if (!url?.startsWith('/') || url.includes('#')) return;
  const target = path.join(publicRoot, url);
  assert(fs.existsSync(target), `${label} points to a missing public asset: ${url}`);
};

assert(siteConfig.author === personal.identity.displayName, 'Site author must use the canonical display name.');
assert(siteConfig.description.includes(personal.currentRole.institution), 'Site description must use the canonical current institution.');
assert(siteConfig.description.includes(research.lab.shortName), 'Site description must use the canonical lab name.');
assert(personal.currentRole.startDate === 'August 2026', 'Current LMU appointment start date must remain August 2026.');
assert(personal.currentRole.labRole === 'Lead, HAITS Lab', 'The canonical HAITS role must remain Lead, HAITS Lab.');
assert(personal.career.mit.period === 'September 2023–July 2026', 'MIT appointment dates do not match the current CV.');
assert(personal.career.ucr.period === '2018–2023', 'UC Riverside PhD dates do not match the current CV.');
assert(personal.education.masters.period === '2015–2017', 'Ohio State MS dates do not match the current CV.');
assert(personal.education.bachelors.period === '2012–2015', 'UESTC BS dates do not match the current CV.');
assertUnique(personal.academicProfiles.map(profile => profile.id), 'Academic profile IDs');
assert(personal.academicProfiles.some(profile => profile.url === personal.links.lmuEce), 'Academic profiles must include the official LMU faculty page.');
assert(personal.academicProfiles.some(profile => profile.url === personal.links.expertFile), 'Academic profiles must include ExpertFile.');
assert(!Object.hasOwn(personal.media.music, 'currentTrack'), 'Transient music selection must not be stored in shared content data.');

assert(modeConfig.portfolio.path === '/blog', 'Portfolio Mode must route to /blog.');
assert(modeConfig.interactive.path === '/game', 'Interactive Mode must route to /game.');
assertUnique(Object.values(modeConfig).map(mode => mode.id), 'Mode IDs');

assertUnique(research.interests.map(area => area.id), 'Research area IDs');
assert(research.agendaChain.length >= 6, 'The research agenda must preserve the full multi-scale chain.');
assert(research.lab.expandedName === 'Human-Centered Artificial Intelligence for Intelligent Transportation Systems', 'The HAITS expansion must preserve Intelligent Transportation Systems.');
assert(research.lab.tagline === 'From human behavior to intelligent transportation systems.', 'The HAITS Lab tagline has drifted.');

assertUnique(publications.map(publication => publication.title), 'Publication titles');
assertUnique(projects.map(project => project.slug), 'Project slugs');
assert(publications.every((publication, index) => index === 0 || publication.year <= publications[index - 1].year), 'Publications must be ordered by descending year.');

assertLocalAsset(personal.links.cv, 'Current CV');
assertLocalAsset(personal.links.dissertation, 'Dissertation');
personal.media.photos.forEach(photo => assertLocalAsset(`/images/${photo.filename}`, `Photo ${photo.title}`));
publications.forEach(publication => assertLocalAsset(publication.link, `Publication ${publication.title}`));
projects.forEach(project => {
  project.publications?.forEach(publication => assertLocalAsset(publication.url, `Project publication ${publication.title}`));
});

const gameAreaContent = Object.values(gameData.areas).map(area => area.content).join('\n');
assert(gameAreaContent.includes(personal.currentRole.institution), 'Interactive Mode must render the canonical current institution.');
assert(gameAreaContent.includes(research.lab.shortName), 'Interactive Mode must render the canonical lab name.');
assert(gameAreaContent.includes(research.summary), 'Interactive Mode must render the canonical research summary.');
assert(gameAreaContent.includes(`${publications.length} selected publications`), 'Interactive Mode publication count must be data-driven.');
assert(gameAreaContent.includes(`${projects.length} major research projects`), 'Interactive Mode project count must be data-driven.');
assert((gameAreaContent.match(/data-track=/g) || []).length === personal.media.music.tracks.length, 'Interactive Mode music controls must be generated from shared track data.');
assert((gameAreaContent.match(/data-game-action="research-detail"/g) || []).length === research.interests.length, 'Interactive Mode research controls must be generated from shared research data.');
assert(personal.academicProfiles.every(profile => gameAreaContent.includes(profile.url)), 'Interactive Mode must render every shared academic profile link.');
assert(gameData.fences.length === 12, 'Interactive Mode fence geometry must remain in the shared spatial configuration.');
assert(gameData.entities.npc.targetSize >= 44, 'NPC interaction targets must be at least 44px.');
assert(gameData.entities.collectible.targetSize >= 44, 'Collectible interaction targets must be at least 44px.');
assert(fs.existsSync(path.join(publicRoot, 'googleb988f0ae90c1aeb8.html')), 'Google Search Console verification file is missing.');

const sharedUsageChecks = [
  ['src/pages/index.astro', ['personal.currentRole.headline', 'research.summary', 'modeConfig.portfolio', 'modeConfig.interactive']],
  ['src/pages/blog.astro', ['personal.currentRole.title', 'research.lab.shortName', 'research.interests']],
  ['src/layouts/BlogLayout.astro', ['personal.identity.displayName', 'personal.currentRole.headline', 'personal.academicProfiles', 'modeConfig.interactive']],
  ['src/data/config/game.js', ['personal.bio.homeIntroduction', 'research.summary', 'modeConfig.portfolio']],
  ['src/pages/game.astro', ['gameData.fences', 'gameData.areas', 'gameData.npcs', 'gameData.world.minimap']],
  ['src/game/engine.js', ['gameData.fences', 'gameData.world.width']],
  ['src/game/ui.js', ['areaViewState', 'syncAreaView', 'openDialog', 'closeDialog', 'data-game-action']],
  ['src/game/dialogs.js', ['aria-modal', 'returnFocus', 'trapFocus']]
];

for (const [relativePath, requiredReferences] of sharedUsageChecks) {
  const source = fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
  for (const reference of requiredReferences) {
    assert(source.includes(reference), `${relativePath} must consume shared ${reference} data.`);
  }
}

const fixedControlsSource = fs.readFileSync(path.join(repoRoot, 'src/components/FixedControls.astro'), 'utf8');
assert(fixedControlsSource.includes('position: fixed'), 'Page controls must remain fixed to the viewport.');
assert(!fixedControlsSource.includes('position: static'), 'Responsive styles must not move page controls back into document flow.');

const forbiddenDuplicatedFacts = [
  personal.identity.displayName,
  personal.currentRole.title,
  personal.currentRole.institution,
  personal.contact.email,
  research.lab.expandedName,
  research.lab.tagline
];

const sourceFiles = [];
const walk = directory => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(target);
    else if (/\.(?:astro|js|mjs|css)$/.test(entry.name)) sourceFiles.push(target);
  }
};
walk(path.join(repoRoot, 'src'));

const canonicalFiles = new Set([
  path.join(repoRoot, 'src/data/content/personal.js'),
  path.join(repoRoot, 'src/data/content/research.js')
]);

for (const file of sourceFiles) {
  if (canonicalFiles.has(file)) continue;
  const source = fs.readFileSync(file, 'utf8');
  for (const fact of forbiddenDuplicatedFacts) {
    assert(!source.includes(fact), `${path.relative(repoRoot, file)} duplicates canonical fact: ${fact}`);
  }
}

if (errors.length) {
  console.error(`Content validation failed with ${errors.length} issue(s):`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Content validation passed: ${publications.length} publications, ${projects.length} projects, ${research.interests.length} research areas, and ${Object.keys(gameData.areas).length} interactive areas.`);
