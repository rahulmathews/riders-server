#!/usr/bin/env node

/**
 * Test script for enhanced changelog generation (GitHub version)
 * This script runs semantic-release in dry-run mode to preview
 * the enhanced changelog format with timestamps and author info
 */

const { execSync } = require('child_process')
const chalk = require('chalk')

console.log(chalk.blue('🧪 Testing Enhanced Changelog Generation (GitHub)'))
console.log(chalk.gray('Using inline templates in .releaserc.js...'))
console.log(chalk.gray('Running semantic-release in dry-run mode...\n'))

try {
  // Get actual git user info (don't override with test values)
  let actualGitName = 'Unknown User'
  let actualGitEmail = 'unknown@example.com'

  try {
    actualGitName = execSync('git config user.name', { encoding: 'utf8' }).trim()
    if (!actualGitName) {
      actualGitName = 'Unknown User'
    }
  } catch (e) {
    console.log(chalk.yellow('⚠️  Git user.name not configured, using fallback'))
    actualGitName = 'Unknown User'
  }

  try {
    actualGitEmail = execSync('git config user.email', { encoding: 'utf8' }).trim()
    if (!actualGitEmail) {
      actualGitEmail = 'unknown@example.com'
    }
  } catch (e) {
    console.log(chalk.yellow('⚠️  Git user.email not configured, using fallback'))
    actualGitEmail = 'unknown@example.com'
  }

  console.log(chalk.yellow(`📋 Git User: ${actualGitName} <${actualGitEmail}>`))
  console.log(
    chalk.yellow(
      `📅 Test Date: ${new Date().toLocaleString('en-US', {
        timeZone: 'America/Chicago',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZoneName: 'short',
      })}\n`
    )
  )

  // Configure git authentication if in CI environment
  if (process.env.GITHUB_TOKEN) {
    console.log(chalk.blue('🔧 Configuring git authentication for CI...'))
    execSync('git config user.email 41898282+github-actions[bot]@users.noreply.github.com', {
      encoding: 'utf8',
    })
    execSync('git config user.name "github-actions[bot]"', { encoding: 'utf8' })
    execSync(
      `git remote set-url origin https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/rahulmathews/riders-server.git`,
      { encoding: 'utf8' }
    )
  }

  // Run semantic-release dry run (don't override git author - use actual commit data)
  const result = execSync('npm run release:dry-run', {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: {
      ...process.env,
      // Don't override GIT_AUTHOR_NAME/EMAIL - let semantic-release use actual commit data
      // Skip CI checks for dry-run testing and allow any branch
      CI: 'false',
      NODE_ENV: 'development',
    },
  })

  console.log(chalk.green('✅ Dry-run completed successfully!'))
  console.log(chalk.blue('\n📝 Enhanced changelog features include:'))
  console.log(chalk.green('  • Commit timestamps with local timezone'))
  console.log(chalk.green('  • Author information for each commit'))
  console.log(chalk.green('  • Release metadata (released by, date, tag)'))
  console.log(chalk.green('  • Last modified information'))
  console.log(chalk.green('  • Enhanced commit linking'))
  console.log(chalk.green('  • Inline templates (no external files)'))
  console.log(chalk.green('  • GitHub-specific merge commit parsing'))
  console.log(chalk.green('  • Pull request linking'))

  console.log(chalk.blue('\n🚀 Release process:'))
  console.log(chalk.gray('  1. Review the output above'))
  console.log(chalk.gray('  2. Merge commits to main → GitHub Actions start automatically'))
  console.log(chalk.gray('  3. Tests + validation run automatically'))
  console.log(chalk.gray('  4. Go to GitHub → Actions → Review workflow runs'))
  console.log(chalk.gray('  5. Or test manually: run "manual-release" workflow'))
  console.log(chalk.gray('  6. Or run locally: npm run release\n'))

  console.log(chalk.gray('Output preview:'))
  console.log(result)
} catch (error) {
  console.error(chalk.red('❌ Test failed:'))
  console.error(error.message)
  process.exit(1)
}
