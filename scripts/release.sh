#!/bin/bash

# Release management script for riders-server
# Usage: ./scripts/release.sh [develop|stable]

set -e

RELEASE_TYPE=${1:-stable}

case $RELEASE_TYPE in
  develop|stable)
    echo "🚀 Preparing $RELEASE_TYPE release..."
    ;;
  *)
    echo "❌ Invalid release type. Use: develop or stable"
    exit 1
    ;;
esac

# Ensure we're on a clean state
if [[ -n $(git status --porcelain) ]]; then
  echo "❌ Working directory is not clean. Please commit or stash changes."
  exit 1
fi

# Run quality checks
echo "🔍 Running quality checks..."
npm run lint:check
npm run format:check
npm run build

# Switch to appropriate branch
if [[ "$RELEASE_TYPE" == "develop" ]]; then
  echo "📋 Switching to develop branch..."
  git checkout develop
  git pull origin develop
elif [[ "$RELEASE_TYPE" == "stable" ]]; then
  echo "📋 Switching to main branch..."
  git checkout main
  git pull origin main
fi

echo "✅ Ready for $RELEASE_TYPE release!"
echo ""
echo "Next steps:"
echo "1. Make your final commits using conventional commit format"
echo "2. Push to the current branch: git push origin $(git branch --show-current)"
echo "3. GitHub Actions will automatically create the release"
echo ""
echo "Current branch: $(git branch --show-current)"
echo "Current version: $(node -p "require('./package.json').version")"
