# Riders Server - Ride Sharing Backend Application

A comprehensive backend API for a modern ride-sharing platform built with NestJS, GraphQL, and self-hosted Supabase, providing real-time ride matching, location tracking, and seamless payment processing.

## 🚗 Project Overview

Riders Server is the backbone of a ride-sharing application that connects passengers with drivers in real-time. The platform handles everything from user authentication and ride requests to live GPS tracking and payment processing.

## 🎯 Core Features

### User Management
- **User Registration & Authentication** - Secure JWT-based auth for riders and drivers
- **Profile Management** - Complete user profiles with verification status
- **Role-based Access Control** - Separate permissions for riders, drivers, and admins

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
- **Prettier** - Consistent code formatting (80 char width, single quotes, trailing commas)
- **Husky** - Pre-commit hooks for automatic code quality checks

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
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
├── .prettierignore        # Prettier ignore patterns
├── tsconfig.json          # TypeScript configuration
├── tsconfig.build.json    # Build-specific TypeScript config
├── package.json           # Dependencies and scripts
├── README.md              # Project documentation
└── ROADMAP.md             # Development roadmap
```

## 🚀 Current API

Basic NestJS REST API with a simple "Hello World" endpoint.

**GraphQL API implementation planned** - See [ROADMAP.md](ROADMAP.md) for detailed implementation timeline.

## 🔧 Development Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Git

### Installation & Running
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

# Code quality and formatting
npm run lint          # Check and fix ESLint issues
npm run lint:check     # Check ESLint issues only (no auto-fix)
npm run format         # Format code with Prettier
npm run format:check   # Check code formatting (no changes)

# Pre-commit hooks automatically run on git commit:
# - ESLint with auto-fix on staged .ts files
# - Prettier formatting on staged .ts and .json files
```



## 📋 Current Status

This is a basic NestJS application with TypeScript, ESLint, and Prettier configured. 

**Next Steps:** See [ROADMAP.md](ROADMAP.md) for the complete implementation plan including:
- GraphQL API setup
- Database integration
- Authentication system
- Real-time features
- Payment processing
- Deployment infrastructure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions, please contact:
- Email: support@riders-app.com
- Issues: [GitHub Issues](https://github.com/your-username/riders-server/issues)

## 🗺 Roadmap

For detailed development phases, timelines, and technical milestones, see our comprehensive [Development Roadmap](ROADMAP.md).

### Quick Overview
- **Phase 1 (Weeks 1-8):** MVP Foundation - Core ride-sharing functionality
- **Phase 2 (Weeks 9-16):** Enhanced Features - Payments, scheduling, admin tools
- **Phase 3 (Weeks 17-24):** Scale & Optimization - Microservices, AI, enterprise features
- **Phase 4+:** Future Enhancements - IoT, blockchain, autonomous vehicles
