import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return 'Welcome to Riders Server! 🚗';
  }

  getEnvironmentInfo(): object {
    return {
      environment: this.configService.get<string>('app.nodeEnv'),
      port: this.configService.get<number>('app.port'),
      host: this.configService.get<string>('app.host'),
      features: {
        realTimeTracking: this.configService.get<boolean>(
          'featureFlags.enableRealTimeTracking',
        ),
        pushNotifications: this.configService.get<boolean>(
          'featureFlags.enablePushNotifications',
        ),
        smsNotifications: this.configService.get<boolean>(
          'featureFlags.enableSmsNotifications',
        ),
        emailNotifications: this.configService.get<boolean>(
          'featureFlags.enableEmailNotifications',
        ),
      },
      development: {
        swagger: this.configService.get<boolean>('development.enableSwagger'),
        graphqlPlayground: this.configService.get<boolean>(
          'development.enableGraphQLPlayground',
        ),
        debug: this.configService.get<boolean>('development.debug'),
      },
    };
  }
}
