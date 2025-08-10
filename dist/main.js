"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('app.port') ?? 3000;
    const host = configService.get('app.host') ?? 'localhost';
    await app.listen(port, host);
    console.log(`🚀 Application is running on: http://${host}:${port}`);
    console.log(`📊 Environment: ${configService.get('app.nodeEnv')}`);
}
bootstrap().catch((err) => {
    console.error('Error starting application:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map