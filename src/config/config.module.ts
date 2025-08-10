import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import {
  appConfig,
  authConfig,
  databaseConfig,
  developmentConfig,
  emailConfig,
  externalServicesConfig,
  featureFlagsConfig,
  fileUploadConfig,
  loggingConfig,
  rateLimitConfig,
  redisConfig,
} from './env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        databaseConfig,
        authConfig,
        externalServicesConfig,
        redisConfig,
        loggingConfig,
        developmentConfig,
        emailConfig,
        fileUploadConfig,
        rateLimitConfig,
        featureFlagsConfig,
      ],
      validationSchema: Joi.object({
        // App Configuration
        NODE_ENV: Joi.string()
          .valid('local', 'development', 'production', 'test', 'staging')
          .default('local'),
        PORT: Joi.number().default(3000),
        HOST: Joi.string().default('localhost'),

        // Database Configuration
        DATABASE_URL: Joi.string().required(),
        SUPABASE_URL: Joi.string().uri().allow('').optional(),
        SUPABASE_ANON_KEY: Joi.string().allow('').optional(),
        SUPABASE_SERVICE_ROLE_KEY: Joi.string().allow('').optional(),

        // Authentication & Security
        JWT_SECRET: Joi.string().min(32).required(),
        JWT_EXPIRES_IN: Joi.string().default('7d'),
        REFRESH_TOKEN_SECRET: Joi.string().min(32).required(),
        REFRESH_TOKEN_EXPIRES_IN: Joi.string().default('30d'),
        BCRYPT_ROUNDS: Joi.number().min(10).max(14).default(12),

        // External Services (optional for development)
        GOOGLE_MAPS_API_KEY: Joi.string().allow('').optional(),
        TWILIO_ACCOUNT_SID: Joi.string().allow('').optional(),
        TWILIO_AUTH_TOKEN: Joi.string().allow('').optional(),
        TWILIO_PHONE_NUMBER: Joi.string().allow('').optional(),
        STRIPE_SECRET_KEY: Joi.string().allow('').optional(),
        STRIPE_PUBLISHABLE_KEY: Joi.string().allow('').optional(),
        STRIPE_WEBHOOK_SECRET: Joi.string().allow('').optional(),
        FIREBASE_PROJECT_ID: Joi.string().allow('').optional(),
        FIREBASE_PRIVATE_KEY: Joi.string().allow('').optional(),
        FIREBASE_CLIENT_EMAIL: Joi.string().allow('').optional(),

        // Redis Configuration
        REDIS_URL: Joi.string().uri().default('redis://localhost:6379'),
        REDIS_PASSWORD: Joi.string().allow('').optional(),

        // Logging & Monitoring
        LOG_LEVEL: Joi.string()
          .valid('error', 'warn', 'info', 'debug')
          .default('debug'),
        SENTRY_DSN: Joi.string().uri().allow('').optional(),
        NEW_RELIC_LICENSE_KEY: Joi.string().allow('').optional(),

        // Development & Testing
        DEBUG: Joi.boolean().default(false),
        ENABLE_SWAGGER: Joi.boolean().default(true),
        ENABLE_GRAPHQL_PLAYGROUND: Joi.boolean().default(true),

        // Email Configuration
        SMTP_HOST: Joi.string().default('smtp.gmail.com'),
        SMTP_PORT: Joi.number().default(587),
        SMTP_USER: Joi.string().email().allow('').optional(),
        SMTP_PASS: Joi.string().allow('').optional(),
        EMAIL_FROM: Joi.string().email().default('noreply@riders-app.com'),

        // File Upload Configuration
        AWS_ACCESS_KEY_ID: Joi.string().allow('').optional(),
        AWS_SECRET_ACCESS_KEY: Joi.string().allow('').optional(),
        AWS_REGION: Joi.string().default('us-east-1'),
        AWS_S3_BUCKET: Joi.string().default('riders-app-uploads'),

        // Rate Limiting
        RATE_LIMIT_WINDOW_MS: Joi.number().default(900000),
        RATE_LIMIT_MAX_REQUESTS: Joi.number().default(100),

        // Feature Flags
        ENABLE_REAL_TIME_TRACKING: Joi.boolean().default(true),
        ENABLE_PUSH_NOTIFICATIONS: Joi.boolean().default(true),
        ENABLE_SMS_NOTIFICATIONS: Joi.boolean().default(true),
        ENABLE_EMAIL_NOTIFICATIONS: Joi.boolean().default(true),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
      envFilePath: [
        '.env.local',
        '.env.development',
        '.env.production',
        '.env',
      ],
    }),
  ],
  exports: [ConfigService],
})
export class AppConfigModule {}
