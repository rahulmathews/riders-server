"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AppService = class AppService {
    constructor(configService) {
        this.configService = configService;
    }
    getHello() {
        return 'Welcome to Riders Server! 🚗';
    }
    getEnvironmentInfo() {
        return {
            environment: this.configService.get('app.nodeEnv'),
            port: this.configService.get('app.port'),
            host: this.configService.get('app.host'),
            features: {
                realTimeTracking: this.configService.get('featureFlags.enableRealTimeTracking'),
                pushNotifications: this.configService.get('featureFlags.enablePushNotifications'),
                smsNotifications: this.configService.get('featureFlags.enableSmsNotifications'),
                emailNotifications: this.configService.get('featureFlags.enableEmailNotifications'),
            },
            development: {
                swagger: this.configService.get('development.enableSwagger'),
                graphqlPlayground: this.configService.get('development.enableGraphQLPlayground'),
                debug: this.configService.get('development.debug'),
            },
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppService);
//# sourceMappingURL=app.service.js.map