import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegisterLogDocument = RegisterLog & Document;

@Schema({ timestamps: true })
export class RegisterLog {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  studentName: string;

  @Prop({ required: true })
  class: string;

  @Prop({ required: true })
  fatherName: string;

  @Prop({ required: true })
  motherName: string;

  @Prop({ required: true })
  examName: string;

  @Prop({ required: true })
  performance: string;

  @Prop({ required: true })
  year: string;

  @Prop({ required: true })
  reason: string;

  @Prop({ required: true })
  dream: string;

  @Prop()
  remarks?: string;

  @Prop()
  fileUploaded: boolean;

  @Prop()
  fileName?: string;

  @Prop()
  fileUrl?: string;

  @Prop()
  fileSize?: number;

  @Prop()
  fileMimeType?: string;

  @Prop({ type: Object })
  originalData: any;

  // pending, approved, rejected
  @Prop({ default: 'pending' })
  status: string;

  @Prop()
  errorMessage?: string;
}

export const RegisterLogSchema = SchemaFactory.createForClass(RegisterLog);
