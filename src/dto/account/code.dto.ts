import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { EmailDto } from './email.dto';
import { Type } from 'class-transformer';

export class CodeDto extends EmailDto {
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ description: 'Code', example: '000000' })
  code: number;
}
