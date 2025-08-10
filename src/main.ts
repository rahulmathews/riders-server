import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port') ?? 3000;
  const host = configService.get<string>('app.host') ?? 'localhost';

  await app.listen(port, host);

  console.log(`🚀 Application is running on: http://${host}:${port}`);
  console.log(`📊 Environment: ${configService.get<string>('app.nodeEnv')}`);
  console.log(`🔍 GraphQL Playground: http://${host}:${port}/graphql`);
}

bootstrap().catch((err) => {
  console.error('Error starting application:', err);
  process.exit(1);
});
