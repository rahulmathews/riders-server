# Development Guide - Riders Server

A comprehensive guide for developers working on the Riders Server project.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/riders-server.git
cd riders-server

# Setup Node.js version (if using nvm)
nvm install
nvm use

# Install dependencies
npm install

# Start development server with hot reload
npm run start:dev

# Build for production
npm run build
npm run start:prod
```

## 📋 Prerequisites

- **Node.js** (v20.15.0) - Managed via nvm
- **npm** (v10.0.0+)
- **Git**
- **IDE**: JetBrains WebStorm (recommended)

## 🔧 Node.js Version Management

This project uses **Node.js v20.15.0** managed via nvm (Node Version Manager).

### Setup nvm and Node.js

1. **Install nvm** (if not already installed):

   ```bash
   # Windows (using nvm-windows)
   # Download from: https://github.com/coreybutler/nvm-windows/releases

   # macOS/Linux
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   ```

2. **Install and use the correct Node.js version**:

   ```bash
   nvm install
   nvm use
   ```

3. **Verify the version**:
   ```bash
   node --version  # Should show v20.15.0
   npm --version   # Should show v10.0.0+
   ```

### Automatic Version Check

The project automatically checks your Node.js version on `npm install`. If
you're using the wrong version, you'll see an error message with instructions to
fix it.

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

This project uses conventional commits enforced by commitlint. All commit
messages must follow this format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

| Type       | Description              | Example                                          |
| ---------- | ------------------------ | ------------------------------------------------ |
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
├── .nvmrc                 # Node.js version specification
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

## 🔄 Release Process

This project uses semantic-release for automated versioning and releases with
pre-release support:

### Release Workflow

The project uses a simplified two-branch approach with automatic version
progression:

1. **Development** (`develop`): Ongoing development with alpha/beta/rc
   versioning
   - `0.1.0-alpha.1` → `0.1.1-alpha.1` → `0.2.0-alpha.1` → `1.0.0-beta.1` →
     `2.0.0-rc.1`
2. **Stable** (`main`): Production-ready releases (1.0.0+)

### Branch Strategy

- **`develop`**: Development branch with alpha/beta/rc versioning
  - `0.x.x-alpha.x`: Alpha phase (early development)
  - `1.x.x-beta.x`: Beta phase (feature complete)
  - `2.x.x-rc.x`: RC phase (release candidate)
- **`main`**: Stable releases (production-ready versions without pre-release
  labels)

### How It Works

1. **Development**: Work on `develop` branch with conventional commits
2. **Automatic Versioning**: semantic-release automatically bumps versions based
   on commit types
3. **Push**: to `develop` branch for development releases, `main` for stable
   releases
4. **Automatic Process**:
   - Version bump in `package.json`
   - Generate release notes from commits
   - Update `CHANGELOG.md` with new version and commits
   - Create Git tag (e.g., `v0.1.0-alpha.1`, `v1.0.0-beta.1`, `v2.0.0`)
   - Create GitHub release with release notes
   - Commit updated `CHANGELOG.md` and `package.json` back to repository
5. **CI/CD**: GitHub Actions handles the entire release process

### Version Bumping Rules

- **Major** (`1.0.0` → `2.0.0`): Breaking changes (`feat!`, `fix!`, etc.)
- **Minor** (`1.0.0` → `1.1.0`): New features (`feat:`)
- **Patch** (`1.0.0` → `1.0.1`): Bug fixes, docs, refactors (`fix:`, `docs:`,
  `style:`, etc.)

### Release Examples

```bash
# Development (automatic version progression with alpha/beta/rc labels)
git commit -m "feat: add user authentication"
git push origin develop  # Creates 0.2.0-alpha.1 (minor bump)

git commit -m "fix: resolve login bug"
git push origin develop  # Creates 0.2.1-alpha.1 (patch bump)

git commit -m "feat!: breaking change in API"
git push origin develop  # Creates 1.0.0-beta.1 (major bump - Beta phase)

git commit -m "feat: final features before release"
git push origin develop  # Creates 2.0.0-rc.1 (major bump - RC phase)

# Stable release (when ready for production)
npm run release:stable
git push origin main     # Creates stable release (e.g., 2.0.0) without pre-release labels
```

### Release Scripts

```bash
# Automated release scripts
npm run release:develop  # Switch to develop branch for development
npm run release:stable   # Switch to main branch for stable release

# Manual semantic-release (for testing only)
npm run release -- --dry-run  # Test release without publishing (local testing only)
```

> **⚠️ Important**: Don't run `npm run release` locally without `--dry-run`.
> Semantic-release is designed to run in CI/CD environments with proper tokens.
> Always use `--dry-run` for local testing.

### GitHub Actions

- **Unified Pipeline**: Single CI → Release workflow for better flow control
- **CI Stage**: Runs on PRs and pushes to main and develop branches
- **Release Stage**: Automatically triggered on pushes to main and develop
  branches (only if CI passes)
- **Formatting**: Automatic formatting applied before release to ensure
  consistency
- **Changelog**: Generated automatically in CHANGELOG.md with proper version
  sections
- **Tags**: Git tags created for each release (e.g., `v0.1.0-alpha.1`,
  `v1.0.0-beta.1`, `v2.0.0`)
- **GitHub Releases**: Automatic GitHub releases with release notes and
  changelog

### Tags and Changelog Management

#### Git Tags

- **Automatic Creation**: Each release creates a Git tag with the version number
- **Tag Format**: `v{version}` (e.g., `v0.1.0-alpha.1`, `v1.0.0-beta.1`,
  `v2.0.0`)
- **Tag History**: View all tags with `git tag -l` or
  `git tag --sort=-version:refname`
- **Tag Details**: `git show v1.0.0-beta.1` to see release details

**Useful Tag Commands:**

```bash
# List all tags
git tag -l

# List tags sorted by version (newest first)
git tag --sort=-version:refname

# Show details of a specific tag
git show v1.0.0-beta.1

# Show commits between two tags
git log v0.1.0-alpha.1..v1.0.0-beta.1 --oneline

# Delete a local tag (if needed)
git tag -d v1.0.0-beta.1

# Push tags to remote
git push origin --tags
```

#### CHANGELOG.md Structure

The changelog is automatically maintained with this structure:

```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2024-01-15

### Added

- New feature A
- New feature B

### Changed

- Updated existing feature

### Fixed

- Bug fix

## [1.0.0-beta.1] - 2024-01-10

### Added

- Beta feature

## [0.2.0-alpha.1] - 2024-01-05

### Added

- Alpha feature
```

#### Commit Tracking

- **Conventional Commits**: All commits are analyzed and categorized
- **Version Sections**: Each version gets its own section with categorized
  changes
- **Breaking Changes**: Highlighted with special formatting
- **Release Notes**: Generated from commit messages and included in GitHub
  releases

#### Formatting Workflow

- **Local Development**: Husky pre-commit hooks ensure formatting on local
  commits
- **CI/CD**: GitHub Actions runs formatting before release to ensure consistency
- **Release Process**: Files are formatted before semantic-release commits them
- **Consistency**: Both `CHANGELOG.md` and `package.json` are formatted
  according to project standards

## 🤝 Contributing Workflow

1. **Create Branch**: `git checkout -b feat/your-feature`
2. **Make Changes**: Follow code quality standards
3. **Commit**: Use conventional commit messages
4. **Test**: Run `npm run lint` and `npm run build`
5. **Push**: `git push origin feat/your-feature`
6. **PR**: Create pull request with clear description

## 🌍 Environment Configuration

This section explains how to set up environment-specific configurations for the
Riders Server application.

### 📁 Configuration Files

#### Environment Files

- `.env.example` - MVP minimal template with essential configurations
- `.env.local` - Your local environment file (create from .env.example)
- `.env.development` - Development environment template
- `.env.production` - Production environment template

#### Configuration Modules

- `src/config/env.config.ts` - Environment variable definitions and types
- `src/config/config.module.ts` - NestJS configuration module with validation

### 🚀 Quick Setup

#### 1. Create Your Environment File

Copy the example file and rename it to `.env.local`:

```bash
cp .env.example .env.local
```

#### 2. Update Required Variables

For MVP development, you only need to set these essential variables:

```bash
# Database (Required)
DATABASE_URL=postgresql://username:password@localhost:5432/riders_db

# Authentication (Required)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-minimum-32-chars
REFRESH_TOKEN_SECRET=your-refresh-token-secret-key-change-this-in-production

# Supabase (Required when using Supabase)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

#### 3. Start the Application

```bash
npm run start:dev
```

### 🔧 Configuration Categories

#### MVP Core Configuration (Required)

- `NODE_ENV` - Environment (local, development, production, test, staging)
- `PORT` - Server port (default: 3000)
- `HOST` - Server host (default: localhost)

#### Database Configuration (Required)

- `DATABASE_URL` - PostgreSQL connection string
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key

#### Authentication & Security (Required)

- `JWT_SECRET` - JWT signing secret (min 32 chars)
- `JWT_EXPIRES_IN` - JWT expiration time
- `REFRESH_TOKEN_SECRET` - Refresh token secret (min 32 chars)
- `REFRESH_TOKEN_EXPIRES_IN` - Refresh token expiration
- `BCRYPT_ROUNDS` - Password hashing rounds (10-14)

#### Development Features (GraphQL & API)

- `DEBUG` - Enable debug mode
- `ENABLE_SWAGGER` - Enable API documentation
- `ENABLE_GRAPHQL_PLAYGROUND` - Enable GraphQL playground
- `LOG_LEVEL` - Logging level (debug, info, warn, error)

#### Feature Flags (MVP Core Features)

- `ENABLE_REAL_TIME_TRACKING` - Enable real-time features
- `ENABLE_PUSH_NOTIFICATIONS` - Enable push notifications (disabled for MVP)
- `ENABLE_SMS_NOTIFICATIONS` - Enable SMS notifications (disabled for MVP)
- `ENABLE_EMAIL_NOTIFICATIONS` - Enable email notifications (disabled for MVP)

#### Optional Services (Add as needed)

- `GOOGLE_MAPS_API_KEY` - Google Maps API key (for location services)
- `REDIS_URL` - Redis connection (for caching - not needed in MVP)
- `STRIPE_SECRET_KEY` - Stripe secret key (for payments - Phase 2)
- `TWILIO_ACCOUNT_SID` - Twilio account SID (for SMS - Phase 2)
- `FIREBASE_PROJECT_ID` - Firebase project ID (for push notifications - Phase 2)

### 🛡️ Security Best Practices

#### 1. Never Commit Environment Files

```bash
# These files are already in .gitignore
.env.local
.env.development
.env.production
.env.test
.env.staging
```

#### 2. Use Strong Secrets

```bash
# Good examples (32+ characters)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-minimum-32-chars
REFRESH_TOKEN_SECRET=your-refresh-token-secret-key-change-this-in-production

# Bad examples (too short)
JWT_SECRET=secret
REFRESH_TOKEN_SECRET=token
```

#### 3. Environment-Specific Secrets

- **Development**: Use weak secrets for local development
- **Production**: Use strong, unique secrets
- **Staging**: Use production-like secrets

### 🔍 Validation

The configuration is validated using Joi schema validation:

- **Required fields** are validated on startup
- **Type validation** ensures correct data types
- **Format validation** for URLs, emails, etc.
- **Length validation** for secrets

#### Validation Errors

If validation fails, you'll see errors like:

```
Config validation error: "JWT_SECRET" length must be at least 32 characters long
Config validation error: "DATABASE_URL" is required
```

### 💻 Usage in Code

#### Using ConfigService (Recommended)

```typescript
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyService {
  constructor(private configService: ConfigService) {}

  // Access typed configuration
  getDatabaseUrl(): string {
    return this.configService.get<string>('database.url')!;
  }

  // Access app configuration
  getNodeEnv(): string {
    return this.configService.get<string>('app.nodeEnv')!;
  }

  // Environment checks
  isDevelopment(): boolean {
    return this.configService.get<string>('app.nodeEnv') === 'development';
  }

  isLocal(): boolean {
    return this.configService.get<string>('app.nodeEnv') === 'local';
  }

  isProduction(): boolean {
    return this.configService.get<string>('app.nodeEnv') === 'production';
  }

  // Feature flags
  isRealTimeTrackingEnabled(): boolean {
    return this.configService.get<boolean>(
      'featureFlags.enableRealTimeTracking',
    )!;
  }
}
```

### 🌍 Environment-Specific Configurations

#### Local Environment

```bash
NODE_ENV=local
DEBUG=true
ENABLE_SWAGGER=true
ENABLE_GRAPHQL_PLAYGROUND=true
LOG_LEVEL=debug
```

#### Development Environment

```bash
NODE_ENV=development
DEBUG=true
ENABLE_SWAGGER=true
ENABLE_GRAPHQL_PLAYGROUND=true
LOG_LEVEL=debug
```

#### Production Environment

```bash
NODE_ENV=production
DEBUG=false
ENABLE_SWAGGER=false
ENABLE_GRAPHQL_PLAYGROUND=false
LOG_LEVEL=info
```

#### Testing Environment

```bash
NODE_ENV=test
DEBUG=false
ENABLE_SWAGGER=false
ENABLE_GRAPHQL_PLAYGROUND=false
LOG_LEVEL=error
```

### 🔄 Environment File Loading Order

The application loads environment files in this order (first found wins):

1. `.env.local` (highest priority for local development)
2. `.env.development` (if NODE_ENV=development)
3. `.env.production` (if NODE_ENV=production)
4. `.env` (fallback)

**Environment File Strategy:**

- **`.env.local`**: Your personal local development settings (highest priority,
  NODE_ENV=local)
- **`.env.development`**: Team-shared development defaults
  (NODE_ENV=development)
- **`.env.production`**: Production environment template (NODE_ENV=production)
- **`.env.example`**: MVP minimal template for new developers

### 🚨 Troubleshooting

#### Common Issues

1. **Validation Errors**
   - Check that required fields are set
   - Ensure secrets are at least 32 characters
   - Verify URL formats are correct

2. **Configuration Not Loading**
   - Check file permissions
   - Verify file path is correct
   - Ensure no syntax errors in .env.local file

3. **Type Errors**
   - Use AppConfigService for type-safe access
   - Check interface definitions in `env.config.ts`

#### Debug Configuration

Add this endpoint to check your configuration:

```typescript
@Get('config')
getEnvironmentInfo()
:
object
{
    return this.appService.getEnvironmentInfo();
}
```

Visit `http://localhost:3000/config` to see your current configuration.

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

1. **File** → **Settings** → **Languages & Frameworks** → **JavaScript** →
   **Code Quality Tools** → **ESLint**
   - ✅ Automatic ESLint configuration
   - ✅ Run eslint --fix on save

#### Prettier Configuration

1. **File** → **Settings** → **Languages & Frameworks** → **JavaScript** →
   **Prettier**
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
3. **Dependencies**: WebStorm will detect package.json and offer to run
   `npm install`
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
