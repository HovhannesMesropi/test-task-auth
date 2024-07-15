import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CoreModule, AuthModule],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}
