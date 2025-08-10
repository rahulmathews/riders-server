# Riders Server - Ride Sharing Backend Application

[![Node.js](https://img.shields.io/badge/node-%3E%3D20.15.0-brightgreen?style=flat-square&logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.3.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/nestjs-10.0.0-red?style=flat-square&logo=nestjs)](https://nestjs.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

A comprehensive backend API for a modern ride-sharing platform built with
NestJS, GraphQL, and self-hosted Supabase, providing real-time ride matching,
location tracking, and seamless payment processing.

## 🚗 Project Overview

Riders Server is the backbone of a ride-sharing application that connects
passengers with drivers in real-time. The platform handles everything from user
authentication and ride requests to live GPS tracking and payment processing.

## 🎯 Core Features

### User Management

- **User Registration & Authentication** - Secure JWT-based auth for riders and
  drivers
- **Profile Management** - Complete user profiles with verification status
- **Role-based Access Control** - Separate permissions for riders, drivers, and
  admins

### Ride Management

- **Ride Requests** - Real-time ride booking with pickup/dropoff locations
- **Driver Matching** - Intelligent algorithm to match nearest available drivers
- **Ride Tracking** - Live GPS tracking for both riders and drivers
- **Ride History** - Complete trip history with receipts and ratings

### Real-time Features

- **Live Location Updates** - WebSocket-based real-time location sharing
- **Push Notifications** - Instant alerts for ride status changes
- **Driver Availability** - Real-time driver status management
- **ETA Calculations** - Dynamic arrival time estimates

### Payment System

- **Multiple Payment Methods** - Credit cards, digital wallets, cash
- **Fare Calculation** - Dynamic pricing based on distance, time, and demand
- **Payment Processing** - Secure transaction handling
- **Receipt Generation** - Automated invoice creation

### Additional Features

- **Rating & Reviews** - Two-way rating system for riders and drivers
- **Admin Dashboard** - Management portal for monitoring and analytics
- **Geofencing** - Service area management and restrictions
- **Analytics** - Trip analytics, earnings reports, and performance metrics

## 🛠 Tech Stack

### Current Implementation

- **NestJS** - Enterprise-grade Node.js framework with TypeScript
- **TypeScript** - Strict mode enabled with comprehensive type safety
- **ESLint** - Code quality with security rules and NestJS optimization
- **Prettier** - Consistent code formatting (80 char width, single quotes,
  trailing commas)
- **Husky** - Pre-commit hooks for automatic code quality checks
- **Commitlint** - Conventional commit message validation

### Planned Features (See ROADMAP.md)

- **GraphQL** - Flexible API with real-time subscriptions
- **Self-hosted Supabase** - PostgreSQL with real-time capabilities
- **Authentication & Authorization** - JWT-based auth system
- **Real-time Features** - Live location tracking and notifications
- **Payment Integration** - Stripe payment processing
- **External APIs** - Google Maps, Twilio SMS, Push notifications
- **Deployment** - Docker, CI/CD, Production infrastructure

## 📁 Project Structure

```
riders-server/
├── src/                   # Source code
│   ├── app.controller.ts  # Main application controller
│   ├── app.module.ts      # Root application module
│   ├── app.service.ts     # Main application service
│   └── main.ts            # Application entry point
├── .github/workflows/     # GitHub Actions workflows
│   └── ci-release.yml     # Unified CI and Release workflow
├── .husky/                # Git hooks
│   ├── pre-commit         # Pre-commit quality checks
│   └── commit-msg         # Commit message validation
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
├── .prettierignore        # Prettier ignore patterns
├── .releaserc.js          # Semantic release configuration
├── commitlint.config.js   # Commitlint configuration
├── scripts/               # Release and utility scripts
│   └── release.sh         # Pre-release management script
├── tsconfig.json          # TypeScript configuration
├── tsconfig.build.json    # Build-specific TypeScript config
├── package.json           # Dependencies and scripts
├── CHANGELOG.md           # Automated changelog with version history
├── README.md              # Project documentation
├── DEVELOPMENT.md         # Developer guide
└── ROADMAP.md             # Development roadmap
```

## 🚀 Current API

Basic NestJS REST API with a simple "Hello World" endpoint.

**GraphQL API implementation planned** - See [ROADMAP.md](ROADMAP.md) for
detailed implementation timeline.

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/your-username/riders-server.git
cd riders-server
npm install

# Start development
npm run start:dev
```

**For detailed development setup, coding standards, and workflows**, see
[DEVELOPMENT.md](DEVELOPMENT.md).

> **IDE**: This project is optimized for JetBrains WebStorm with comprehensive
> setup instructions in the development guide.

## 📋 Current Status

This is a basic NestJS application with a robust development foundation:

- ✅ TypeScript with strict mode
- ✅ ESLint with security rules
- ✅ Prettier code formatting
- ✅ Husky pre-commit hooks
- ✅ Commitlint for conventional commits
- ✅ Semantic release for automated versioning

## 📚 Documentation

- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Complete developer guide, coding
  standards, and workflows
- **[ROADMAP.md](ROADMAP.md)** - Detailed implementation timeline and feature
  roadmap

## 🎯 Next Steps

See [ROADMAP.md](ROADMAP.md) for the complete implementation plan:

- Semantic release automation
- GraphQL API setup
- Database integration
- Authentication system
- Real-time features
- Payment processing

## 🚀 Release Workflow

This project uses a simplified two-branch approach with automatic version
progression:

1. **Development** (`develop`): Ongoing development with alpha/beta/rc
   versioning
   - `0.1.0-alpha.1` → `0.1.1-alpha.1` → `0.2.0-alpha.1` → `1.0.0-beta.1` →
     `2.0.0-rc.1`
2. **Stable** (`main`): Production-ready releases (1.0.0+)

**Features:**

- **Unified Pipeline**: Single CI → Release workflow for better flow control
- **Automatic Tags**: Git tags created for each release (`v0.1.0-alpha.1`,
  `v1.0.0-beta.1`, `v2.0.0`)
- **Changelog Generation**: `CHANGELOG.md` automatically updated with
  categorized commits
- **GitHub Releases**: Automatic GitHub releases with release notes

**For detailed release process and scripts**, see
[DEVELOPMENT.md](DEVELOPMENT.md).

## 🤝 Contributing

1. Read [DEVELOPMENT.md](DEVELOPMENT.md) for development setup and coding
   standards
2. Fork the repository
3. Create a feature branch (`git checkout -b feat/your-feature`)
4. Follow conventional commit format for all commits
5. Push to your branch and create a Pull Request

**All contributions must pass automated checks** (ESLint, Prettier, commitlint).

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## 📞 Support

For support and questions, please contact:

- Issues: [GitHub Issues](https://github.com/your-username/riders-server/issues)

## 🗺 Roadmap

For detailed development phases, timelines, and technical milestones, see our
comprehensive [Development Roadmap](ROADMAP.md).

### Quick Overview

- **Phase 1 (Weeks 1-8):** MVP Foundation - Core ride-sharing functionality
- **Phase 2 (Weeks 9-16):** Enhanced Features - Payments, scheduling, admin
  tools
- **Phase 3 (Weeks 17-24):** Scale & Optimization - Microservices, AI,
  enterprise features
- **Phase 4+:** Future Enhancements - IoT, blockchain, autonomous vehicles
