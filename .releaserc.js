module.exports = {
  repositoryUrl: 'https://github.com/rahulmathews/riders-server.git',
  branches: [
    'main',
    {
      name: 'develop',
      prerelease: 'alpha',
      channel: 'alpha'
    }
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/changelog', {
      changelogFile: 'CHANGELOG.md',
      changelogTitle: '# Changelog\n\nAll notable changes to this project will be documented in this file.\n\nThe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),\nand this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n'
    }],
    ['@semantic-release/github', {
      failTitle: false,
      labels: false
    }],
    ['@semantic-release/git', {
      assets: ['CHANGELOG.md', 'package.json'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }],
  ],
  preset: 'angular',
  releaseRules: [
    { type: 'feat', release: 'minor' },
    { type: 'fix', release: 'patch' },
    { type: 'docs', release: 'patch' },
    { type: 'style', release: 'patch' },
    { type: 'refactor', release: 'patch' },
    { type: 'perf', release: 'patch' },
    { type: 'test', release: 'patch' },
    { type: 'build', release: 'patch' },
    { type: 'ci', release: 'patch' },
    { type: 'chore', release: 'patch' },
    { type: 'revert', release: 'patch' },
    { breaking: true, release: 'major' },
  ],
  parserOpts: {
    noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
  },
  writerOpts: {
    groupBy: 'type',
    commitGroupsSort: 'title',
    commitsSort: 'header',
  },
};
