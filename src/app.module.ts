import { Module } from '@nestjs/common';

import { AppConfigModule } from '@config/config.module';
import { AppGraphQLModule } from '@modules/graphql/graphql.module';
import { UsersModule } from '@modules/users/users.module';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';

@Module({
  imports: [AppConfigModule, UsersModule, AppGraphQLModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
