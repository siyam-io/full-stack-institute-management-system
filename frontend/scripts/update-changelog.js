const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Load version from package.json
const pkgPath = path.join(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const version = pkg.version;

// 2. Get latest tag
let latestTag = '';
try {
  latestTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
} catch (err) {
  latestTag = '';
}

console.log(`Target Version: ${version}`);
console.log(`Latest Tag: ${latestTag || 'None (using all commits)'}`);

// 3. Get commits since the latest tag
const commitRange = latestTag ? `${latestTag}..HEAD` : 'HEAD';
let logOutput = '';
try {
  logOutput = execSync(`git log ${commitRange} --pretty=format:"%s|%h"`, { encoding: 'utf8' }).trim();
} catch (err) {
  console.log('No git history found or failed to run git log.');
}

const commits = logOutput ? logOutput.split('\n').map(line => {
  const parts = line.split('|');
  const hash = parts.pop();
  const subject = parts.join('|');
  return { subject: subject.trim(), hash: hash.trim() };
}) : [];

// Filter out release/changelog/CI commits
const filteredCommits = commits.filter(c => {
  const sub = c.subject.toLowerCase();
  return !(
    sub.startsWith('docs(changelog)') ||
    sub.startsWith('release:') ||
    sub.startsWith('v') && /^\d+\.\d+\.\d+/.test(sub.slice(1).trim()) ||
    sub.includes('update changelog') ||
    sub.includes('release v') ||
    sub.includes('merge branch') ||
    sub.includes('merge pull request')
  );
});

if (filteredCommits.length === 0) {
  console.log('No new meaningful commits found. Skipping update.');
  process.exit(0);
}

// 4. Categorize commits
const categories = {
  major: { title: '🚀 Major / Features', items: [] },
  fix: { title: '🐛 Fixes', items: [] },
  docs: { title: '📚 Documentation', items: [] },
  maint: { title: '⚙️ Maintenance & Polish', items: [] },
  other: { title: '📝 Other Changes', items: [] }
};

filteredCommits.forEach(c => {
  const sub = c.subject;
  const subLower = sub.toLowerCase();
  
  if (subLower.startsWith('feat:') || subLower.startsWith('feat(') || subLower.startsWith('major:') || sub.includes('🚀')) {
    categories.major.items.push(c);
  } else if (subLower.startsWith('fix:') || subLower.startsWith('fix(') || subLower.startsWith('bug:') || sub.includes('🐛')) {
    categories.fix.items.push(c);
  } else if (subLower.startsWith('docs:') || subLower.startsWith('docs(') || sub.includes('📚')) {
    categories.docs.items.push(c);
  } else if (
    subLower.startsWith('chore:') ||
    subLower.startsWith('refactor:') ||
    subLower.startsWith('perf:') ||
    subLower.startsWith('style:') ||
    subLower.startsWith('test:') ||
    sub.includes('⚙️') ||
    sub.includes('✨') ||
    sub.includes('🔧')
  ) {
    categories.maint.items.push(c);
  } else {
    categories.other.items.push(c);
  }
});

// 5. Generate Markdown block
const today = new Date().toISOString().split('T')[0];
let block = `## [${version}] - ${today}\n\n`;

let hasItems = false;
for (const key in categories) {
  const cat = categories[key];
  if (cat.items.length > 0) {
    hasItems = true;
    block += `### ${cat.title}\n\n`;
    cat.items.forEach(item => {
      block += `- ${item.subject} (${item.hash})\n`;
    });
    block += `\n`;
  }
}

if (!hasItems) {
  console.log('No categorized items found. Skipping update.');
  process.exit(0);
}

// 6. Update CHANGELOG.md
const changelogPath = path.join(__dirname, '../CHANGELOG.md');
let changelog = fs.readFileSync(changelogPath, 'utf8');

const versionHeader = `## [${version}]`;
const versionHeaderIndex = changelog.indexOf(versionHeader);

if (versionHeaderIndex !== -1) {
  console.log(`Version ${version} already exists in CHANGELOG.md. Skipping overwrite to preserve manual curated notes.`);
  process.exit(0);
} else {
  console.log(`Adding new entry for version ${version} to CHANGELOG.md...`);
  const hrIndex = changelog.indexOf('\n---');
  if (hrIndex !== -1) {
    const insertPos = hrIndex + 5;
    const before = changelog.slice(0, insertPos);
    const after = changelog.slice(insertPos);
    changelog = before + '\n\n' + block.trim() + '\n\n---' + after;
  } else {
    changelog = block + '\n\n' + changelog;
  }
}

fs.writeFileSync(changelogPath, changelog, 'utf8');
console.log('CHANGELOG.md updated successfully!');
