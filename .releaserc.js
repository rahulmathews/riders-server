/**
 * Enhanced semantic-release configuration for GitHub
 * Properly handles alpha channel for develop branch and stable releases for main
 */

module.exports = {
  branches: [
    'main',
    { name: 'develop', prerelease: 'alpha', channel: 'alpha' },
    { name: 'feature/*', prerelease: 'alpha', channel: 'alpha' },
    { name: 'hotfix/*', prerelease: 'alpha', channel: 'alpha' }
  ],
  tagFormat: 'v${version}',
  repositoryUrl: process.env.GITHUB_TOKEN
    ? `https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/rahulmathews/riders-server.git`
    : 'https://github.com/rahulmathews/riders-server',
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            { type: 'feat', release: 'minor' },
            { type: 'fix', release: 'patch' },
            { type: 'perf', release: 'patch' },
            { type: 'refactor', release: 'patch' },
            { type: 'docs', release: 'patch' },
            { type: 'test', release: 'patch' },
            { type: 'build', release: 'patch' },
            { type: 'ci', release: 'patch' },
            { type: 'style', release: 'patch' },
            { type: 'chore', release: 'patch' },
            { type: 'revert', release: 'patch' },
            { type: 'merge', release: false },
          ],
        },
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
        },
        releaseRules: [
          { type: 'merge', release: false },
          { type: 'chore', scope: 'release', release: 'patch' },
        ],
        parser: (commit) => {
          // Handle merge commits that don't follow conventional commit format
          if (commit.message.startsWith('Merge')) {
            return {
              ...commit,
              type: 'merge',
              subject: commit.message.split('\n')[0], // Take first line only
              release: false, // Merge commits don't trigger releases
            };
          }
          return commit;
        },
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            { type: 'feat', section: '✨ Features' },
            { type: 'fix', section: '🐛 Bug Fixes' },
            { type: 'perf', section: '⚡ Performance Improvements' },
            { type: 'refactor', section: '♻️ Code Refactoring' },
            { type: 'docs', section: '📚 Documentation' },
            { type: 'test', section: '🧪 Tests' },
            { type: 'build', section: '🏗️ Build System' },
            { type: 'ci', section: '👷 Continuous Integration' },
            { type: 'style', section: '💄 Styles' },
            { type: 'chore', hidden: true },
            { type: 'revert', section: '⏪ Reverts' },
            { type: 'merge', section: '🔀 Pull Requests' },
          ],
        },
        writerOpts: {
          transform: (commit, context) => {
            // Map commit types to emoji sections (override presetConfig for template display)
            const typeToSectionMap = {
              feat: '✨ Features',
              fix: '🐛 Bug Fixes',
              perf: '⚡ Performance Improvements',
              refactor: '♻️ Code Refactoring',
              docs: '📚 Documentation',
              test: '🧪 Tests',
              build: '🏗️ Build System',
              ci: '👷 Continuous Integration',
              style: '💄 Styles',
              revert: '⏪ Reverts',
              merge: '🔀 Pull Requests',
            }

            // Format dates consistently for commit timestamps
            const formatCommitDate = (date) => {
              let parsedDate
              if (!date) {
                parsedDate = new Date()
              } else if (typeof date === 'string') {
                parsedDate = new Date(date)
              } else if (date instanceof Date) {
                parsedDate = date
              } else {
                parsedDate = new Date()
              }

              // Check if date is valid
              if (isNaN(parsedDate.getTime())) {
                parsedDate = new Date()
              }

              return parsedDate.toLocaleString('en-US', {
                timeZone: 'America/Chicago',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZoneName: 'short',
              })
            }

            // Handle merge commits specially - include them in changelog
            if (
              commit.type === 'merge' ||
              commit.subject?.startsWith('Merge') ||
              commit.message?.startsWith('Merge')
            ) {
              const newCommit = {
                ...commit,
                type: 'merge',
                section: '🔀 Pull Requests'
              }

              // Extract PR number and branch name from merge commit message
              // Handle different GitHub merge commit formats
              let mergeMatch = (commit.subject || commit.message).match(
                /Merge pull request #(\d+) from ([^\s]+)/
              )

              if (!mergeMatch) {
                // Try format: "Merge branch 'branch-name' into main"
                mergeMatch = (commit.subject || commit.message).match(
                  /Merge branch '([^']+)' into ([^\s]+)/
                )
              }

              if (!mergeMatch) {
                // Try format: "Merge remote-tracking branch 'origin/branch' into branch"
                mergeMatch = (commit.subject || commit.message).match(
                  /Merge remote-tracking branch '([^']+)' into ([^\s]+)/
                )
              }

              if (mergeMatch) {
                let prNumber, branchName
                if (mergeMatch.length === 3 && mergeMatch[1].startsWith('#')) {
                  // First format: "Merge pull request #123 from branch"
                  ;[, prNumber, branchName] = mergeMatch
                  prNumber = prNumber.replace('#', '')
                  newCommit.subject = `Merged [PR #${prNumber}](https://github.com/rahulmathews/riders-server/pull/${prNumber}) from ${branchName}`
                } else if (mergeMatch.length === 3) {
                  // Second/Third format: "Merge branch 'branch' into main" or "Merge remote-tracking branch 'origin/branch' into branch"
                  ;[, branchName] = mergeMatch
                  newCommit.subject = `Merged branch ${branchName}`
                } else {
                  newCommit.subject = `Merged: ${commit.subject || commit.message}`
                }
              } else {
                // If no pattern found, use a generic format
                newCommit.subject = `Merged: ${commit.subject || commit.message}`
              }

              // Add short hash for merge commits before returning
              if (commit.hash) {
                newCommit.shortHash = commit.hash.substring(0, 7)
              }

              // Add formatted date for merge commits
              let commitDate = new Date()
              if (commit.hash || commit.commit?.long) {
                try {
                  // Use git to get the actual commit date
                  const { execSync } = require('child_process')
                  const commitHash = commit.hash || commit.commit.long
                  const gitDate = execSync(`git show -s --format=%ci ${commitHash}`, {
                    encoding: 'utf8',
                    timeout: 5000,
                  }).trim()
                  commitDate = new Date(gitDate)

                  // Verify the date is valid
                  if (isNaN(commitDate.getTime())) {
                    commitDate = new Date() // fallback
                  }
                } catch (error) {
                  // If git command fails, use current time as fallback
                  commitDate = new Date()
                }
              }
              newCommit.formattedDate = formatCommitDate(commitDate)

              // Ensure merge commits are included in changelog
              return newCommit
            }

            // Skip chore commits (they're marked as hidden in presetConfig)
            if (commit.type === 'chore') {
              return false
            }

            // Create new commit object to avoid immutable object issues
            const newCommit = { ...commit }

            // Override section title with emoji version
            if (commit.type && typeToSectionMap[commit.type]) {
              newCommit.section = typeToSectionMap[commit.type]
            }

            // Add formatted dates to commit - get actual date from git
            let commitDate = new Date()

            if (commit.hash || commit.commit?.long) {
              try {
                // Use git to get the actual commit date
                const { execSync } = require('child_process')
                const commitHash = commit.hash || commit.commit.long
                const gitDate = execSync(`git show -s --format=%ci ${commitHash}`, {
                  encoding: 'utf8',
                  timeout: 5000,
                }).trim()
                commitDate = new Date(gitDate)

                // Verify the date is valid
                if (isNaN(commitDate.getTime())) {
                  commitDate = new Date() // fallback
                }
              } catch (error) {
                // If git command fails, use current time as fallback
                commitDate = new Date()
              }
            }

            newCommit.formattedDate = formatCommitDate(commitDate)

            // Add short hash
            if (commit.hash) {
              newCommit.shortHash = commit.hash.substring(0, 7)
            }

            // Add formatted release date to context (only once per release)
            if (!context.formattedReleaseDate) {
              context.formattedReleaseDate = formatCommitDate(new Date())
            }

            // Add latest commit author to context (capture the most recent commit author)
            if (!context.latestCommitAuthor && commit.author) {
              context.latestCommitAuthor = {
                name: commit.author.name || 'Unknown',
                email: commit.author.email || '',
              }
            }

            // Final validation - ensure commit has valid subject
            // Be more lenient for merge commits and other special cases
            if (!newCommit.subject || newCommit.subject.trim() === '') {
              // For merge commits, use the message as subject
              if (newCommit.type === 'merge' && commit.message) {
                newCommit.subject = commit.message
                return newCommit
              }
              // For other commits without subject, try to use message
              if (commit.message && commit.message.trim() !== '') {
                newCommit.subject = commit.message
                return newCommit
              }
              return false
            }

            return newCommit
          },
          headerPartial: `## [{{version}}](https://github.com/rahulmathews/riders-server/releases/tag/v{{version}}) ({{date}})

Released by: {{#if latestCommitAuthor.name}}[{{latestCommitAuthor.name}}](mailto:{{latestCommitAuthor.email}}){{else}}semantic-release{{/if}}

Release Date: {{formattedReleaseDate}}

`,
          commitPartial: `{{subject}} ([{{shortHash}}](https://github.com/rahulmathews/riders-server/commit/{{hash}})) - {{formattedDate}} by [{{author.name}}](mailto:{{author.email}})

`,
          mainTemplate: `{{> header}}
{{#each commitGroups}}
### {{#if commits.[0].section}}{{commits.[0].section}}{{else}}{{title}}{{/if}}

{{#each commits}}
- {{subject}} ([{{shortHash}}](https://github.com/rahulmathews/riders-server/commit/{{hash}})) - {{formattedDate}} by [{{author.name}}](mailto:{{author.email}})

{{/each}}

{{/each}}
`,
        },
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            { type: 'feat', section: '✨ Features' },
            { type: 'fix', section: '🐛 Bug Fixes' },
            { type: 'perf', section: '⚡ Performance Improvements' },
            { type: 'refactor', section: '♻️ Code Refactoring' },
            { type: 'docs', section: '📚 Documentation' },
            { type: 'test', section: '🧪 Tests' },
            { type: 'build', section: '🏗️ Build System' },
            { type: 'ci', section: '👷 Continuous Integration' },
            { type: 'style', section: '💄 Styles' },
            { type: 'chore', hidden: true },
            { type: 'revert', section: '⏪ Reverts' },
            { type: 'merge', section: '🔀 Pull Requests' },
          ],
        },
        writerOpts: {
          transform: (commit, context) => {
            // Map commit types to emoji sections (override presetConfig for template display)
            const typeToSectionMap = {
              feat: '✨ Features',
              fix: '🐛 Bug Fixes',
              perf: '⚡ Performance Improvements',
              refactor: '♻️ Code Refactoring',
              docs: '📚 Documentation',
              test: '🧪 Tests',
              build: '🏗️ Build System',
              ci: '👷 Continuous Integration',
              style: '💄 Styles',
              revert: '⏪ Reverts',
              merge: '🔀 Pull Requests',
            }

            // Format dates consistently for commit timestamps
            const formatCommitDate = (date) => {
              let parsedDate
              if (!date) {
                parsedDate = new Date()
              } else if (typeof date === 'string') {
                parsedDate = new Date(date)
              } else if (date instanceof Date) {
                parsedDate = date
              } else {
                parsedDate = new Date()
              }

              // Check if date is valid
              if (isNaN(parsedDate.getTime())) {
                parsedDate = new Date()
              }

              return parsedDate.toLocaleString('en-US', {
                timeZone: 'America/Chicago',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZoneName: 'short',
              })
            }

            // Handle merge commits specially - include them in changelog
            if (
              commit.type === 'merge' ||
              commit.subject?.startsWith('Merge') ||
              commit.message?.startsWith('Merge')
            ) {
              const newCommit = {
                ...commit,
                type: 'merge',
                section: '🔀 Pull Requests'
              }

              // Extract PR number and branch name from merge commit message
              // Handle different GitHub merge commit formats
              let mergeMatch = (commit.subject || commit.message).match(
                /Merge pull request #(\d+) from ([^\s]+)/
              )

              if (!mergeMatch) {
                // Try format: "Merge branch 'branch-name' into main"
                mergeMatch = (commit.subject || commit.message).match(
                  /Merge branch '([^']+)' into ([^\s]+)/
                )
              }

              if (!mergeMatch) {
                // Try format: "Merge remote-tracking branch 'origin/branch' into branch"
                mergeMatch = (commit.subject || commit.message).match(
                  /Merge remote-tracking branch '([^']+)' into ([^\s]+)/
                )
              }

              if (mergeMatch) {
                let prNumber, branchName
                if (mergeMatch.length === 3 && mergeMatch[1].startsWith('#')) {
                  // First format: "Merge pull request #123 from branch"
                  ;[, prNumber, branchName] = mergeMatch
                  prNumber = prNumber.replace('#', '')
                  newCommit.subject = `Merged [PR #${prNumber}](https://github.com/rahulmathews/riders-server/pull/${prNumber}) from ${branchName}`
                } else if (mergeMatch.length === 3) {
                  // Second/Third format: "Merge branch 'branch' into main" or "Merge remote-tracking branch 'origin/branch' into branch"
                  ;[, branchName] = mergeMatch
                  newCommit.subject = `Merged branch ${branchName}`
                } else {
                  newCommit.subject = `Merged: ${commit.subject || commit.message}`
                }
              } else {
                // If no pattern found, use a generic format
                newCommit.subject = `Merged: ${commit.subject || commit.message}`
              }

              // Add short hash for merge commits before returning
              if (commit.hash) {
                newCommit.shortHash = commit.hash.substring(0, 7)
              }

              // Add formatted date for merge commits
              let commitDate = new Date()
              if (commit.hash || commit.commit?.long) {
                try {
                  // Use git to get the actual commit date
                  const { execSync } = require('child_process')
                  const commitHash = commit.hash || commit.commit.long
                  const gitDate = execSync(`git show -s --format=%ci ${commitHash}`, {
                    encoding: 'utf8',
                    timeout: 5000,
                  }).trim()
                  commitDate = new Date(gitDate)

                  // Verify the date is valid
                  if (isNaN(commitDate.getTime())) {
                    commitDate = new Date() // fallback
                  }
                } catch (error) {
                  // If git command fails, use current time as fallback
                  commitDate = new Date()
                }
              }
              newCommit.formattedDate = formatCommitDate(commitDate)

              // Ensure merge commits are included in changelog
              return newCommit
            }

            // Skip chore commits (they're marked as hidden in presetConfig)
            if (commit.type === 'chore') {
              return false
            }

            // Create new commit object to avoid immutable object issues
            const newCommit = { ...commit }

            // Override section title with emoji version
            if (commit.type && typeToSectionMap[commit.type]) {
              newCommit.section = typeToSectionMap[commit.type]
            }

            // Add formatted dates to commit - get actual date from git
            let commitDate = new Date()

            if (commit.hash || commit.commit?.long) {
              try {
                // Use git to get the actual commit date
                const { execSync } = require('child_process')
                const commitHash = commit.hash || commit.commit.long
                const gitDate = execSync(`git show -s --format=%ci ${commitHash}`, {
                  encoding: 'utf8',
                  timeout: 5000,
                }).trim()
                commitDate = new Date(gitDate)

                // Verify the date is valid
                if (isNaN(commitDate.getTime())) {
                  commitDate = new Date() // fallback
                }
              } catch (error) {
                // If git command fails, use current time as fallback
                commitDate = new Date()
              }
            }

            newCommit.formattedDate = formatCommitDate(commitDate)

            // Add short hash
            if (commit.hash) {
              newCommit.shortHash = commit.hash.substring(0, 7)
            }

            // Add formatted release date to context (only once per release)
            if (!context.formattedReleaseDate) {
              context.formattedReleaseDate = formatCommitDate(new Date())
            }

            // Add latest commit author to context (capture the most recent commit author)
            if (!context.latestCommitAuthor && commit.author) {
              context.latestCommitAuthor = {
                name: commit.author.name || 'Unknown',
                email: commit.author.email || '',
              }
            }

            // Final validation - ensure commit has valid subject
            // Be more lenient for merge commits and other special cases
            if (!newCommit.subject || newCommit.subject.trim() === '') {
              // For merge commits, use the message as subject
              if (newCommit.type === 'merge' && commit.message) {
                newCommit.subject = commit.message
                return newCommit
              }
              // For other commits without subject, try to use message
              if (commit.message && commit.message.trim() !== '') {
                newCommit.subject = commit.message
                return newCommit
              }
              return false
            }

            return newCommit
          },
          headerPartial: `## [{{version}}](https://github.com/rahulmathews/riders-server/releases/tag/v{{version}}) ({{date}})

Released by: {{#if latestCommitAuthor.name}}[{{latestCommitAuthor.name}}](mailto:{{latestCommitAuthor.email}}){{else}}semantic-release{{/if}}

Release Date: {{formattedReleaseDate}}

`,
          commitPartial: `{{subject}} ([{{shortHash}}](https://github.com/rahulmathews/riders-server/commit/{{hash}})) - {{formattedDate}} by [{{author.name}}](mailto:{{author.email}})

`,
          mainTemplate: `{{> header}}
{{#each commitGroups}}
### {{#if commits.[0].section}}{{commits.[0].section}}{{else}}{{title}}{{/if}}

{{#each commits}}
- {{subject}} ([{{shortHash}}](https://github.com/rahulmathews/riders-server/commit/{{hash}})) - {{formattedDate}} by [{{author.name}}](mailto:{{author.email}})

{{/each}}

{{/each}}
`,
        },
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
        tarballDir: 'dist',
        prepareCmd: 'npm run build',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: [
          'CHANGELOG.md', 
          'package.json', 
          'package-lock.json', 
          'README.md',
          'dist'
        ],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    // Only include GitHub plugin in CI environment or when token is available
    ...(process.env.CI === 'true' || process.env.GITHUB_TOKEN ? [
      [
        '@semantic-release/github',
        {
          assets: [
            {
              path: 'dist',
              label: 'build',
            },
          ],
        },
      ],
    ] : []),
  ],
}
