"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const env_config_1 = require("./env.config");
let AppConfigModule = class AppConfigModule {
};
exports.AppConfigModule = AppConfigModule;
exports.AppConfigModule = AppConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [
                    env_config_1.appConfig,
                    env_config_1.databaseConfig,
                    env_config_1.authConfig,
                    env_config_1.externalServicesConfig,
                    env_config_1.redisConfig,
                    env_config_1.loggingConfig,
                    env_config_1.developmentConfig,
                    env_config_1.emailConfig,
                    env_config_1.fileUploadConfig,
                    env_config_1.rateLimitConfig,
                    env_config_1.featureFlagsConfig,
                ],
                validationSchema: Joi.object({
                    NODE_ENV: Joi.string()
                        .valid('local', 'development', 'production', 'test', 'staging')
                        .default('local'),
                    PORT: Joi.number().default(3000),
                    HOST: Joi.string().default('localhost'),
                    DATABASE_URL: Joi.string().required(),
                    SUPABASE_URL: Joi.string().uri().allow('').optional(),
                    SUPABASE_ANON_KEY: Joi.string().allow('').optional(),
                    SUPABASE_SERVICE_ROLE_KEY: Joi.string().allow('').optional(),
                    JWT_SECRET: Joi.string().min(32).required(),
                    JWT_EXPIRES_IN: Joi.string().default('7d'),
                    REFRESH_TOKEN_SECRET: Joi.string().min(32).required(),
                    REFRESH_TOKEN_EXPIRES_IN: Joi.string().default('30d'),
                    BCRYPT_ROUNDS: Joi.number().min(10).max(14).default(12),
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
                    REDIS_URL: Joi.string().uri().default('redis://localhost:6379'),
                    REDIS_PASSWORD: Joi.string().allow('').optional(),
                    LOG_LEVEL: Joi.string()
                        .valid('error', 'warn', 'info', 'debug')
                        .default('debug'),
                    SENTRY_DSN: Joi.string().uri().allow('').optional(),
                    NEW_RELIC_LICENSE_KEY: Joi.string().allow('').optional(),
                    DEBUG: Joi.boolean().default(false),
                    ENABLE_SWAGGER: Joi.boolean().default(true),
                    ENABLE_GRAPHQL_PLAYGROUND: Joi.boolean().default(true),
                    SMTP_HOST: Joi.string().default('smtp.gmail.com'),
                    SMTP_PORT: Joi.number().default(587),
                    SMTP_USER: Joi.string().email().allow('').optional(),
                    SMTP_PASS: Joi.string().allow('').optional(),
                    EMAIL_FROM: Joi.string().email().default('noreply@riders-app.com'),
                    AWS_ACCESS_KEY_ID: Joi.string().allow('').optional(),
                    AWS_SECRET_ACCESS_KEY: Joi.string().allow('').optional(),
                    AWS_REGION: Joi.string().default('us-east-1'),
                    AWS_S3_BUCKET: Joi.string().default('riders-app-uploads'),
                    RATE_LIMIT_WINDOW_MS: Joi.number().default(900000),
                    RATE_LIMIT_MAX_REQUESTS: Joi.number().default(100),
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
        exports: [config_1.ConfigService],
    })
], AppConfigModule);
//# sourceMappingURL=config.module.js.map