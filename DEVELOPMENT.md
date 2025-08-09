# Development Guide - Riders Server

A comprehensive guide for developers working on the Riders Server project.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/riders-server.git
cd riders-server

# Install dependencies
npm install

# Start development server with hot reload
npm run start:dev

# Build for production
npm run build
npm run start:prod
```

## 📋 Prerequisites

- **Node.js** (v18+)
- **npm** or yarn
- **Git**
- **IDE**: JetBrains WebStorm (recommended)

### WebStorm Setup

WebStorm has built-in support for:

- **TypeScript**: Native support with excellent IntelliSense
- **ESLint**: Built-in integration with auto-fix on save
- **Prettier**: Built-in formatting with save actions
- **Git**: Advanced Git integration with conventional commits
- **Node.js**: Debugging and run configurations

## 🛠 Development Scripts

### Core Commands

```bash
npm run start:dev     # Start development server with hot reload
npm run start:debug   # Start with debugging enabled
npm run build         # Build for production
npm run start:prod    # Start production build
```

### Code Quality

```bash
npm run lint          # Check and fix ESLint issues
npm run lint:check    # Check ESLint issues only (no auto-fix)
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting (no changes)
npm run commitlint    # Validate commit message format
```

## 📝 Conventional Commits

This project uses conventional commits enforced by commitlint. All commit messages must follow this format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

| Type       | Description              | Example                                          |
|------------|--------------------------|--------------------------------------------------|
| `feat`     | New feature              | `feat(auth): add JWT token validation`           |
| `fix`      | Bug fix                  | `fix(api): resolve user profile update issue`    |
| `docs`     | Documentation changes    | `docs(readme): update installation instructions` |
| `style`    | Code style changes       | `style: fix linting issues in user service`      |
| `refactor` | Code refactoring         | `refactor(db): optimize user query performance`  |
| `perf`     | Performance improvements | `perf: improve API response time`                |
| `test`     | Adding/updating tests    | `test: add unit tests for auth service`          |
| `chore`    | Build/tool changes       | `chore: update dependencies`                     |
| `ci`       | CI/CD changes            | `ci: add GitHub Actions workflow`                |
| `build`    | Build system changes     | `build: configure webpack for production`        |
| `revert`   | Revert previous commit   | `revert: revert commit abc123`                   |

### Breaking Changes

For breaking changes, add `!` after the type/scope:

```bash
feat!: remove deprecated API endpoints
feat(api)!: change authentication method

BREAKING CHANGE: This removes the old auth system
```

### Examples of Valid Commits

```bash
feat(auth): add JWT token validation
fix(api): resolve user profile update issue
docs: update README with new installation steps
style: fix code formatting in user service
refactor(database): optimize user query performance
perf(api): improve response time for user endpoints
test(auth): add unit tests for login function
chore: update dependencies to latest versions
ci: add GitHub Actions workflow for testing
build: configure webpack for production builds
```

### Examples of Invalid Commits (will be rejected)

```bash
Add new feature          # Missing type
fix bug                 # Too vague, no scope if needed
Fix: resolve issue      # Type should be lowercase
feat(Auth): new login   # Scope should be lowercase
random commit message   # No conventional format
```

## 🔧 Code Quality Standards

### TypeScript Configuration

- **Strict Mode**: Enabled for maximum type safety
- **Return Types**: Explicit function return types required
- **No Unused Variables**: Enforced
- **Prefer Optional Chaining**: `?.` for safe property access
- **Prefer Nullish Coalescing**: `??` instead of `||`

### ESLint Rules

- **Security**: Object injection detection, unsafe regex detection
- **Import Management**: Organized imports with alphabetical sorting
- **Code Quality**: Complexity limits (max 10), function length (50 lines)
- **TypeScript**: Strict typing rules with NestJS optimizations

### Prettier Configuration

- **Line Width**: 80 characters
- **Quotes**: Single quotes for strings
- **Semicolons**: Always required
- **Trailing Commas**: All trailing commas for better git diffs
- **Indentation**: 2 spaces, no tabs

## 🎣 Git Hooks (Husky)

### Pre-commit Hook

Automatically runs before each commit:

- **ESLint**: Auto-fix on staged TypeScript files
- **Prettier**: Format staged TypeScript and JSON files
- **Blocks commit**: If linting or formatting fails

### Commit-msg Hook

Validates commit messages:

- **Conventional Commits**: Enforces format
- **Message Length**: Max 100 characters for header
- **Required Fields**: Type and subject must be present
- **Case Sensitivity**: Type and scope must be lowercase

## 📁 Project Structure

```
riders-server/
├── src/                   # Source code
│   ├── app.controller.ts  # Main application controller
│   ├── app.module.ts      # Root application module
│   ├── app.service.ts     # Main application service
│   └── main.ts            # Application entry point
├── .husky/                # Git hooks
│   ├── pre-commit         # Pre-commit quality checks
│   └── commit-msg         # Commit message validation
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
├── .prettierignore        # Prettier ignore patterns
├── .gitattributes         # Git attributes for line endings
├── commitlint.config.js   # Commitlint configuration
├── tsconfig.json          # TypeScript configuration
├── tsconfig.build.json    # Build-specific TypeScript config
├── package.json           # Dependencies and scripts
├── README.md              # Project overview
├── DEVELOPMENT.md         # This development guide
└── ROADMAP.md             # Development roadmap
```

## 🚨 Common Issues & Solutions

### ESLint Errors

- **Import order**: ESLint auto-sorts imports alphabetically
- **Explicit return types**: Add `: ReturnType` to functions
- **Unused variables**: Remove or prefix with underscore `_variable`

### TypeScript Errors

- **Strict null checks**: Use optional chaining `?.` and nullish coalescing `??`
- **Any types**: Prefer specific types over `any`
- **Implicit returns**: Ensure all code paths return values

### Commit Message Rejected

- **Check format**: Must follow `type(scope): description` pattern
- **Lowercase**: Type and scope must be lowercase
- **Length**: Header must be ≤ 100 characters
- **Required fields**: Type and subject are mandatory

### Husky Hook Failures

- **File permissions**: Run `chmod +x .husky/*`
- **Line endings**: Run `dos2unix .husky/*` on Windows
- **Missing dependencies**: Run `npm install`

## 🔍 Debugging

### Development Server

```bash
npm run start:debug  # Starts with debugging on port 9229
```

### WebStorm Debugging

1. Set breakpoints in TypeScript files
2. Create Node.js run configuration for `npm run start:debug`
3. Use "Debug" button (Shift+F9) or debug icon
4. WebStorm automatically attaches to the debugging port

### Logging

- Development: All logs enabled
- Production: Error and warn levels only

## 🧪 Testing (Future Implementation)

Testing framework is planned for Phase 3 of development. When implemented:

```bash
npm run test           # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Run tests with coverage
npm run test:e2e       # Run end-to-end tests
```

## 🚀 Performance Tips

- Use `npm run start:dev` for hot reload during development
- Build artifacts are in `dist/` directory
- Source maps enabled for debugging
- Incremental compilation for faster builds

## 📦 Dependencies Management

### Adding Dependencies

```bash
# Production dependency
npm install package-name

# Development dependency
npm install --save-dev package-name
```

### Updating Dependencies

```bash
# Check outdated packages
npm outdated

# Update all dependencies
npm update

# Update specific package
npm install package-name@latest
```

## 🔄 Release Process (Future)

When semantic-release is implemented:

1. **Commit**: Use conventional commits
2. **Merge**: to main branch
3. **Automatic**: Version bump, changelog, GitHub release
4. **Publish**: Automatic NPM publishing (if applicable)

## 🤝 Contributing Workflow

1. **Create Branch**: `git checkout -b feat/your-feature`
2. **Make Changes**: Follow code quality standards
3. **Commit**: Use conventional commit messages
4. **Test**: Run `npm run lint` and `npm run build`
5. **Push**: `git push origin feat/your-feature`
6. **PR**: Create pull request with clear description

## 📞 Getting Help

- **Documentation**: Check README.md and ROADMAP.md
- **Issues**: Use GitHub issues for bugs and feature requests
- **Code Review**: Request reviews for all PRs
- **Questions**: Ask in team chat or create discussion

## 🔧 IDE Configuration

### WebStorm Settings (recommended)

#### Code Style & Formatting

1. **File** → **Settings** → **Editor** → **Code Style** → **TypeScript**
    - Set indent: 2 spaces
    - Enable "Use single quotes in new code"

2. **File** → **Settings** → **Tools** → **Actions on Save**
    - ✅ Reformat code
    - ✅ Optimize imports
    - ✅ Run eslint --fix

#### ESLint Configuration

1. **File** → **Settings** → **Languages & Frameworks** → **JavaScript** → **Code Quality Tools** → **ESLint**
    - ✅ Automatic ESLint configuration
    - ✅ Run eslint --fix on save

#### Prettier Configuration

1. **File** → **Settings** → **Languages & Frameworks** → **JavaScript** → **Prettier**
    - ✅ On 'Reformat Code' action
    - ✅ On save

#### Git Integration

1. **File** → **Settings** → **Version Control** → **Git**
    - ✅ Use credential helper
2. **VCS** → **Git** → **Commit Template**: Use conventional commit format

#### Run Configurations

WebStorm automatically detects npm scripts. Create additional configurations:

1. **Run** → **Edit Configurations** → **Add** → **npm**
2. Useful configurations:
    - **Development**: Script `start:dev`
    - **Debug**: Script `start:debug`
    - **Build**: Script `build`
    - **Lint**: Script `lint`

#### WebStorm Project Setup

1. **Open Project**: File → Open → Select the project directory
2. **Trust Project**: Click "Trust Project" when prompted
3. **Dependencies**: WebStorm will detect package.json and offer to run `npm install`
4. **TypeScript**: Automatically configured from tsconfig.json

### Git Configuration

```bash
# Set up user info
git config user.name "Your Name"
git config user.email "your.email@domain.com"

# Set up line endings (Windows)
git config core.autocrlf false
```

#### WebStorm Git Integration

- **VCS** menu provides full Git functionality
- **Commit** tool window (Alt+0) for staging and committing
- Built-in merge conflict resolution
- Integrated Git log and branches view

## 📈 Monitoring Development

- **Build Status**: Check after each commit
- **Code Quality**: Review ESLint and Prettier reports
- **Performance**: Monitor bundle size and build times
- **Dependencies**: Keep track of security vulnerabilities

---

**Last Updated**: [Current Date]  
**Maintainer**: Development Team  
**Questions?** Create an issue or check the README.md
