import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterModule } from './api/register/register.module';
import { ConfigModule } from './config/config.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot('mongodb://localhost:27017/pw_genius'),
    SharedModule,
    RegisterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
