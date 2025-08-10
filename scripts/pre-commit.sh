#!/bin/bash

# Pre-commit hook with comprehensive error handling
# This script runs lint-staged and provides detailed feedback

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[PRE-COMMIT]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to handle errors
handle_error() {
    local exit_code=$?
    local line_number=$1
    local command=$2
    
    print_error "Pre-commit hook failed!"
    print_error "Exit code: $exit_code"
    print_error "Failed at line: $line_number"
    print_error "Command: $command"
    
    echo ""
    print_status "Troubleshooting tips:"
    echo "  1. Run 'npm run lint:check' to see all linting errors"
    echo "  2. Run 'npm run format:check' to see formatting issues"
    echo "  3. Run 'npm run lint' to auto-fix linting issues"
    echo "  4. Run 'npm run format' to auto-fix formatting issues"
    echo "  5. Check that all staged files are properly formatted"
    
    exit $exit_code
}

# Set up error handling
trap 'handle_error ${LINENO} "$BASH_COMMAND"' ERR

# Start pre-commit process
echo ""
print_status "Running pre-commit checks..."
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Not in a git repository!"
    exit 1
fi

# Check if there are staged files
if [ -z "$(git diff --cached --name-only)" ]; then
    print_warning "No files staged for commit. Skipping pre-commit checks."
    exit 0
fi

# Check if lint-staged is available
if ! command -v npx &> /dev/null; then
    print_error "npx is not available. Please install Node.js and npm."
    exit 1
fi

# Check if lint-staged is installed
if ! npx lint-staged --version &> /dev/null; then
    print_error "lint-staged is not installed. Please run 'npm install'."
    exit 1
fi

# Show what files will be processed
print_status "Staged files to be processed:"
git diff --cached --name-only | while read -r file; do
    echo "  - $file"
done
echo ""

# Run lint-staged with progress indicator
print_status "Running lint-staged..."
echo ""

# Run lint-staged and capture output
if output=$(npx lint-staged 2>&1); then
    print_success "All pre-commit checks passed!"
    echo ""
    print_status "Files processed successfully:"
    echo "$output" | grep -E "(eslint|prettier)" | head -10
    echo ""
else
    print_error "lint-staged failed with the following output:"
    echo ""
    echo "$output"
    echo ""
    print_error "Please fix the issues above and try committing again."
    exit 1
fi

# Final success message
print_success "Pre-commit hook completed successfully! 🎉"
echo ""
