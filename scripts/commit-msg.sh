#!/bin/bash

# Commit-msg hook with comprehensive error handling
# This script validates commit messages using commitlint

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[COMMIT-MSG]${NC} $1"
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
    
    print_error "Commit-msg hook failed!"
    print_error "Exit code: $exit_code"
    print_error "Failed at line: $line_number"
    print_error "Command: $command"
    
    echo ""
    print_status "Troubleshooting tips:"
    echo "  1. Check your commit message format"
    echo "  2. Use conventional commit format: type(scope): description"
    echo "  3. Valid types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert"
    echo "  4. Example: 'feat: add user authentication'"
    echo "  5. Example: 'fix(auth): resolve login issue'"
    echo "  6. Example: 'docs: update README'"
    
    exit $exit_code
}

# Set up error handling
trap 'handle_error ${LINENO} "$BASH_COMMAND"' ERR

# Get the commit message file
COMMIT_MSG_FILE="$1"

# Check if commit message file exists
if [ ! -f "$COMMIT_MSG_FILE" ]; then
    print_error "Commit message file not found: $COMMIT_MSG_FILE"
    exit 1
fi

# Read the commit message
COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")

print_status "Validating commit message..."
echo ""

# Check if commit message is empty
if [ -z "$COMMIT_MSG" ]; then
    print_error "Commit message is empty!"
    exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Not in a git repository!"
    exit 1
fi

# Check if commitlint is available
if ! command -v npx &> /dev/null; then
    print_error "npx is not available. Please install Node.js and npm."
    exit 1
fi

# Check if commitlint is installed
if ! npx commitlint --version &> /dev/null; then
    print_error "commitlint is not installed. Please run 'npm install'."
    exit 1
fi

# Show the commit message being validated
print_status "Commit message:"
echo "  $COMMIT_MSG"
echo ""

# Run commitlint
print_status "Running commitlint validation..."
echo ""

# Run commitlint and capture output
if output=$(npx commitlint --edit "$COMMIT_MSG_FILE" 2>&1); then
    print_success "Commit message validation passed!"
    echo ""
    print_status "Message format is valid and follows conventional commits."
else
    print_error "Commit message validation failed!"
    echo ""
    print_error "Error details:"
    echo "$output"
    echo ""
    print_status "Conventional commit format:"
    echo "  type(scope?): subject"
    echo ""
    print_status "Valid types:"
    echo "  feat     - New feature"
    echo "  fix      - Bug fix"
    echo "  docs     - Documentation changes"
    echo "  style    - Code style changes (formatting, etc.)"
    echo "  refactor - Code refactoring"
    echo "  perf     - Performance improvements"
    echo "  test     - Adding or updating tests"
    echo "  build    - Build system changes"
    echo "  ci       - CI/CD changes"
    echo "  chore    - Maintenance tasks"
    echo "  revert   - Reverting previous commits"
    echo ""
    print_status "Examples:"
    echo "  feat: add user authentication"
    echo "  fix(auth): resolve login timeout issue"
    echo "  docs: update API documentation"
    echo "  style: format code with prettier"
    echo "  refactor: simplify user service"
    echo "  test: add unit tests for auth module"
    echo "  ci: update GitHub Actions workflow"
    echo "  chore: update dependencies"
    echo ""
    exit 1
fi

# Final success message
print_success "Commit message validation completed successfully! 🎉"
echo ""
