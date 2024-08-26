import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { LedgerType, LedgerTypeEnum } from 'src/types/ledger';

export class LedgerTypeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'JWT 토큰' })
  token: string;

  @IsEnum(LedgerTypeEnum)
  @IsNotEmpty()
  @ApiProperty({ description: '소비/소득 타입', example: 'spent' })
  ledgerType: LedgerType;
}

export class LedgerDto {}
