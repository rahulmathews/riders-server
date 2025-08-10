"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.featureFlagsConfig = exports.rateLimitConfig = exports.fileUploadConfig = exports.emailConfig = exports.developmentConfig = exports.loggingConfig = exports.redisConfig = exports.externalServicesConfig = exports.authConfig = exports.databaseConfig = exports.appConfig = void 0;
const config_1 = require("@nestjs/config");
exports.appConfig = (0, config_1.registerAs)('app', () => ({
    nodeEnv: process.env.NODE_ENV ?? 'local',
    port: parseInt(process.env.PORT ?? '3000', 10),
    host: process.env.HOST ?? 'localhost',
}));
exports.databaseConfig = (0, config_1.registerAs)('database', () => ({
    url: process.env.DATABASE_URL ?? 'postgresql://localhost:5432/riders_db',
    supabaseUrl: process.env.SUPABASE_URL ?? '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY ?? '',
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
}));
exports.authConfig = (0, config_1.registerAs)('auth', () => ({
    jwtSecret: process.env.JWT_SECRET ??
        'your-super-secret-jwt-key-change-this-in-production',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET ?? 'your-refresh-token-secret',
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN ?? '30d',
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS ?? '12', 10),
}));
exports.externalServicesConfig = (0, config_1.registerAs)('externalServices', () => ({
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
}));
exports.redisConfig = (0, config_1.registerAs)('redis', () => ({
    url: process.env.REDIS_URL ?? 'redis://localhost:6379',
    password: process.env.REDIS_PASSWORD ?? undefined,
}));
exports.loggingConfig = (0, config_1.registerAs)('logging', () => ({
    level: process.env.LOG_LEVEL ?? 'debug',
    sentryDsn: process.env.SENTRY_DSN ?? undefined,
    newRelicLicenseKey: process.env.NEW_RELIC_LICENSE_KEY ?? undefined,
}));
exports.developmentConfig = (0, config_1.registerAs)('development', () => ({
    debug: process.env.DEBUG === 'true',
    enableSwagger: process.env.ENABLE_SWAGGER === 'true',
    enableGraphQLPlayground: process.env.ENABLE_GRAPHQL_PLAYGROUND === 'true',
}));
exports.emailConfig = (0, config_1.registerAs)('email', () => ({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT ?? '587', 10),
    user: process.env.SMTP_USER ?? '',
    pass: process.env.SMTP_PASS ?? '',
    from: process.env.EMAIL_FROM ?? 'noreply@riders-app.com',
}));
exports.fileUploadConfig = (0, config_1.registerAs)('fileUpload', () => ({
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    awsRegion: process.env.AWS_REGION ?? 'us-east-1',
    awsS3Bucket: process.env.AWS_S3_BUCKET ?? 'riders-app-uploads',
}));
exports.rateLimitConfig = (0, config_1.registerAs)('rateLimit', () => ({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? '900000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS ?? '100', 10),
}));
exports.featureFlagsConfig = (0, config_1.registerAs)('featureFlags', () => ({
    enableRealTimeTracking: process.env.ENABLE_REAL_TIME_TRACKING === 'true',
    enablePushNotifications: process.env.ENABLE_PUSH_NOTIFICATIONS === 'true',
    enableSmsNotifications: process.env.ENABLE_SMS_NOTIFICATIONS === 'true',
    enableEmailNotifications: process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true',
}));
//# sourceMappingURL=env.config.js.map