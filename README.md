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

### Backend Framework
- **NestJS** - Enterprise-grade Node.js framework with TypeScript
- **GraphQL** - Flexible API with real-time subscriptions
- **TypeScript** - Type-safe development throughout
- **Apollo Server** - GraphQL server implementation

### Database & Authentication
- **Self-hosted Supabase** - PostgreSQL with real-time capabilities
- **PostGIS** - Geospatial data handling for location services
- **Supabase Auth** - JWT-based authentication with social logins
- **Row Level Security (RLS)** - Database-level security policies

### External Services
- **Google Maps API** - Mapping, geocoding, and route calculation
- **Stripe API** - Payment processing and billing
- **Twilio** - SMS notifications and phone verification
- **Push Notifications** - Real-time alerts and updates

### Development & Deployment
- **Docker** - Containerized development and deployment
- **Docker Compose** - Multi-service orchestration
- **GitHub Actions** - CI/CD pipeline
- **Jest** - Unit and integration testing
- **Nginx** - Reverse proxy and load balancing

## 📁 Project Structure

```
riders-server/
├── src/
│   ├── modules/           # Feature modules (NestJS)
│   │   ├── auth/          # Authentication module
│   │   ├── users/         # User management
│   │   ├── rides/         # Ride operations
│   │   ├── locations/     # Location tracking
│   │   ├── payments/      # Payment processing
│   │   └── notifications/ # Push notifications
│   ├── common/            # Shared utilities
│   │   ├── guards/        # Auth guards
│   │   ├── decorators/    # Custom decorators
│   │   ├── dto/           # Data transfer objects
│   │   └── entities/      # Database entities
│   ├── config/            # Configuration files
│   ├── graphql/           # GraphQL schema files
│   └── main.ts            # Application entry point
├── test/                  # Test files
├── docs/                  # API documentation
├── docker/                # Docker configuration
│   ├── Dockerfile         # Main application
│   ├── docker-compose.yml # Multi-service setup
│   └── supabase/          # Supabase configuration
└── scripts/               # Deployment scripts
```

## 🚀 GraphQL API

### Queries
```graphql
# User Management
query GetProfile { user { id name email phone role } }
query GetRideHistory { rides { id status fare createdAt } }

# Ride Management
query GetActiveRides { activeRides { id rider driver status } }
query GetNearbyDrivers($location: LocationInput!) { 
  nearbyDrivers(location: $location) { id user location vehicle }
}
```

### Mutations
```graphql
# Authentication
mutation Register($input: RegisterInput!) { register(input: $input) { user token } }
mutation Login($input: LoginInput!) { login(input: $input) { user token } }

# Ride Operations
mutation RequestRide($input: RideRequestInput!) { 
  requestRide(input: $input) { id status pickupLocation dropoffLocation }
}
mutation AcceptRide($rideId: ID!) { acceptRide(rideId: $rideId) { id status driver } }
mutation CompleteRide($rideId: ID!) { completeRide(rideId: $rideId) { id fare receipt } }
```

### Subscriptions (Real-time)
```graphql
# Live Updates
subscription RideStatusUpdated($rideId: ID!) { 
  rideStatusUpdated(rideId: $rideId) { id status driver location }
}
subscription DriverLocationUpdated($rideId: ID!) { 
  driverLocationUpdated(rideId: $rideId) { latitude longitude heading }
}
subscription NewRideRequests { 
  newRideRequests { id rider pickupLocation fare }
}
```

## 🔧 Development Setup

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose
- Git

### Environment Variables
```bash
# Supabase Configuration
SUPABASE_URL=http://localhost:54321
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key
DATABASE_URL=postgresql://postgres:password@localhost:54322/postgres

# JWT Configuration (from Supabase)
JWT_SECRET=your-supabase-jwt-secret
JWT_EXPIRES_IN=24h

# External APIs
GOOGLE_MAPS_API_KEY=your-google-maps-key
STRIPE_SECRET_KEY=sk_test_your-stripe-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token

# Server Configuration
PORT=3000
NODE_ENV=development
GRAPHQL_PLAYGROUND=true
GRAPHQL_INTROSPECTION=true
```

### Installation & Running
```bash
# Clone the repository
git clone https://github.com/your-username/riders-server.git
cd riders-server

# Install dependencies
npm install

# Start Supabase locally
npx supabase start

# Run database migrations
npm run db:migrate
npm run db:seed

# Start development server
npm run start:dev

# Run tests
npm run test
npm run test:e2e

# Build for production
npm run build
npm run start:prod
```

### Docker Development
```bash
# Start all services with Docker Compose
docker-compose up -d

# View GraphQL Playground
open http://localhost:3000/graphql

# Access Supabase Studio
open http://localhost:54323
```

## 📊 Database Schema

### Core Tables (Supabase/PostgreSQL)
- **auth.users** - Supabase authentication (managed)
- **public.profiles** - Extended user profiles (riders & drivers)
- **public.rides** - Ride requests and trip data
- **public.vehicles** - Driver vehicle information
- **public.payments** - Payment transactions and billing
- **public.reviews** - Ratings and feedback system
- **public.locations** - Real-time GPS tracking (with PostGIS)
- **public.notifications** - Push notification history

### PostGIS Extensions
- **Geospatial Queries** - Find nearby drivers within radius
- **Route Optimization** - Calculate optimal pickup routes
- **Geofencing** - Service area restrictions and boundaries

## 🔐 Security Features

- **JWT Authentication** - Secure token-based auth
- **Rate Limiting** - API abuse prevention
- **Input Validation** - Request sanitization
- **HTTPS Only** - Encrypted connections
- **CORS Protection** - Cross-origin security
- **SQL Injection Prevention** - Parameterized queries

## 🚀 Deployment

### Docker Deployment
```bash
# Build and start all services
docker-compose up -d --build

# Scale the application
docker-compose up -d --scale app=3

# View logs
docker-compose logs -f app
```

### Production Deployment
- **Self-hosted Supabase** - Full control over database and auth
- **Docker Swarm/Kubernetes** - Container orchestration
- **Nginx** - Reverse proxy and SSL termination
- **Let's Encrypt** - Free SSL certificates
- **Monitoring** - Prometheus + Grafana for metrics

## 📈 Monitoring & Analytics

- **Health Checks** - Service availability monitoring
- **Performance Metrics** - Response time tracking
- **Error Logging** - Comprehensive error tracking
- **Business Analytics** - Ride and revenue metrics

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
