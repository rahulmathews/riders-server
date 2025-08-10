import { Module } from '@nestjs/common';

import { AppConfigModule } from '@config/config.module';
import { UsersModule } from '@modules/users/users.module';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';

@Module({
  imports: [AppConfigModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
