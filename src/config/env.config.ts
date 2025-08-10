import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  url: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseServiceRoleKey: string;
}

export interface AuthConfig {
  jwtSecret: string;
  jwtExpiresIn: string;
  refreshTokenSecret: string;
  refreshTokenExpiresIn: string;
  bcryptRounds: number;
}

export interface ExternalServicesConfig {
  googleMapsApiKey: string;
  twilioAccountSid: string;
  twilioAuthToken: string;
  twilioPhoneNumber: string;
  stripeSecretKey: string;
  stripePublishableKey: string;
  stripeWebhookSecret: string;
  firebaseProjectId: string;
  firebasePrivateKey: string;
  firebaseClientEmail: string;
}

export interface RedisConfig {
  url: string;
  password?: string | undefined;
}

export interface LoggingConfig {
  level: string;
  sentryDsn?: string | undefined;
  newRelicLicenseKey?: string | undefined;
}

export interface DevelopmentConfig {
  debug: boolean;
  enableSwagger: boolean;
  enableGraphQLPlayground: boolean;
}

export interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
}

export interface FileUploadConfig {
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
  awsRegion: string;
  awsS3Bucket: string;
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export interface FeatureFlagsConfig {
  enableRealTimeTracking: boolean;
  enablePushNotifications: boolean;
  enableSmsNotifications: boolean;
  enableEmailNotifications: boolean;
}

export interface AppConfig {
  nodeEnv: string;
  port: number;
  host: string;
}

export const appConfig = registerAs(
  'app',
  (): AppConfig => ({
    nodeEnv: process.env.NODE_ENV ?? 'local',
    port: parseInt(process.env.PORT ?? '3000', 10),
    host: process.env.HOST ?? 'localhost',
  }),
);

export const databaseConfig = registerAs(
  'database',
  (): DatabaseConfig => ({
    url: process.env.DATABASE_URL ?? 'postgresql://localhost:5432/riders_db',
    supabaseUrl: process.env.SUPABASE_URL ?? '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY ?? '',
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  }),
);

export const authConfig = registerAs(
  'auth',
  (): AuthConfig => ({
    jwtSecret:
      process.env.JWT_SECRET ??
      'your-super-secret-jwt-key-change-this-in-production',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
    refreshTokenSecret:
      process.env.REFRESH_TOKEN_SECRET ?? 'your-refresh-token-secret',
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN ?? '30d',
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS ?? '12', 10),
  }),
);

export const externalServicesConfig = registerAs(
  'externalServices',
  (): ExternalServicesConfig => ({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY ?? '',
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID ?? '',
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN ?? '',
    twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER ?? '',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? '',
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY ?? '',
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? '',
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID ?? '',
    firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY ?? '',
    firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL ?? '',
  }),
);

export const redisConfig = registerAs(
  'redis',
  (): RedisConfig => ({
    url: process.env.REDIS_URL ?? 'redis://localhost:6379',
    password: process.env.REDIS_PASSWORD ?? undefined,
  }),
);

export const loggingConfig = registerAs(
  'logging',
  (): LoggingConfig => ({
    level: process.env.LOG_LEVEL ?? 'debug',
    sentryDsn: process.env.SENTRY_DSN ?? undefined,
    newRelicLicenseKey: process.env.NEW_RELIC_LICENSE_KEY ?? undefined,
  }),
);

export const developmentConfig = registerAs(
  'development',
  (): DevelopmentConfig => ({
    debug: process.env.DEBUG === 'true',
    enableSwagger: process.env.ENABLE_SWAGGER === 'true',
    enableGraphQLPlayground: process.env.ENABLE_GRAPHQL_PLAYGROUND === 'true',
  }),
);

export const emailConfig = registerAs(
  'email',
  (): EmailConfig => ({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT ?? '587', 10),
    user: process.env.SMTP_USER ?? '',
    pass: process.env.SMTP_PASS ?? '',
    from: process.env.EMAIL_FROM ?? 'noreply@riders-app.com',
  }),
);

export const fileUploadConfig = registerAs(
  'fileUpload',
  (): FileUploadConfig => ({
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    awsRegion: process.env.AWS_REGION ?? 'us-east-1',
    awsS3Bucket: process.env.AWS_S3_BUCKET ?? 'riders-app-uploads',
  }),
);

export const rateLimitConfig = registerAs(
  'rateLimit',
  (): RateLimitConfig => ({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? '900000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS ?? '100', 10),
  }),
);

export const featureFlagsConfig = registerAs(
  'featureFlags',
  (): FeatureFlagsConfig => ({
    enableRealTimeTracking: process.env.ENABLE_REAL_TIME_TRACKING === 'true',
    enablePushNotifications: process.env.ENABLE_PUSH_NOTIFICATIONS === 'true',
    enableSmsNotifications: process.env.ENABLE_SMS_NOTIFICATIONS === 'true',
    enableEmailNotifications: process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true',
  }),
);
