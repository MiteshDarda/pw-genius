import {
  IsArray,
  IsString,
  IsIn,
  IsOptional,
  ArrayMinSize,
} from 'class-validator';

export class BulkUpdateDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  ids: string[];

  @IsString()
  @IsIn(['pending', 'approved', 'rejected'])
  status: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}
