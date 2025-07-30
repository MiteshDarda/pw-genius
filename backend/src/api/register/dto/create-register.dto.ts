import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateRegisterDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  studentName: string;

  @IsString()
  @IsNotEmpty()
  class: string;

  @IsString()
  @IsNotEmpty()
  fatherName: string;

  @IsString()
  @IsNotEmpty()
  motherName: string;

  @IsString()
  @IsNotEmpty()
  examName: string;

  @IsString()
  @IsNotEmpty()
  performance: string;

  @IsString()
  @IsNotEmpty()
  year: string;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsString()
  @IsNotEmpty()
  dream: string;

  @IsString()
  @IsOptional()
  remarks?: string;

  @IsOptional()
  file?: Express.Multer.File;
}
