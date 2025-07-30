import { IsString, IsIn, IsOptional } from 'class-validator';

export class UpdateStatusDto {
  @IsString()
  @IsIn(['pending', 'approved', 'rejected'])
  status: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}
