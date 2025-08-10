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
export declare const appConfig: (() => AppConfig) & import("@nestjs/config").ConfigFactoryKeyHost<AppConfig>;
export declare const databaseConfig: (() => DatabaseConfig) & import("@nestjs/config").ConfigFactoryKeyHost<DatabaseConfig>;
export declare const authConfig: (() => AuthConfig) & import("@nestjs/config").ConfigFactoryKeyHost<AuthConfig>;
export declare const externalServicesConfig: (() => ExternalServicesConfig) & import("@nestjs/config").ConfigFactoryKeyHost<ExternalServicesConfig>;
export declare const redisConfig: (() => RedisConfig) & import("@nestjs/config").ConfigFactoryKeyHost<RedisConfig>;
export declare const loggingConfig: (() => LoggingConfig) & import("@nestjs/config").ConfigFactoryKeyHost<LoggingConfig>;
export declare const developmentConfig: (() => DevelopmentConfig) & import("@nestjs/config").ConfigFactoryKeyHost<DevelopmentConfig>;
export declare const emailConfig: (() => EmailConfig) & import("@nestjs/config").ConfigFactoryKeyHost<EmailConfig>;
export declare const fileUploadConfig: (() => FileUploadConfig) & import("@nestjs/config").ConfigFactoryKeyHost<FileUploadConfig>;
export declare const rateLimitConfig: (() => RateLimitConfig) & import("@nestjs/config").ConfigFactoryKeyHost<RateLimitConfig>;
export declare const featureFlagsConfig: (() => FeatureFlagsConfig) & import("@nestjs/config").ConfigFactoryKeyHost<FeatureFlagsConfig>;
