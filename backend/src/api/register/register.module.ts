import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { RegisterLog, RegisterLogSchema } from './schemas/register-log.schema';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RegisterLog.name, schema: RegisterLogSchema },
    ]),
    SharedModule,
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
