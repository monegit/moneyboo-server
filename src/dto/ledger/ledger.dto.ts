import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LedgerDto {
  uid: string;

  @IsString()
  @IsNotEmpty({ message: '구매 혹은 소비 장소를 적어주세요.' })
  @ApiProperty({
    description: '구매/소비 장소 혹은 가게 이름',
    example: '애플스토어',
  })
  place: string;

  @IsString()
  @IsNotEmpty({ message: '상품명을 적어주세요.' })
  @ApiProperty({ description: '상품명', example: '아이폰 15' })
  goodsName: string;

  @IsNumberString()
  @IsNotEmpty({ message: '가격을 적어주세요.' })
  @ApiProperty({ description: '가격', example: '1000000' })
  price: number;

  @IsDateString({ strict: true }, { message: '잘못된 날짜 양식입니다.' })
  @IsNotEmpty({ message: '날짜를 적어주세요.' })
  @ApiProperty({
    description: '날짜',
    example: '2024-08-22',
  })
  date: Date;

  @IsString()
  @MaxLength(30, { message: '30자를 초과한 메모입니다.' })
  @ApiProperty({ description: '메모', example: '기존 휴대폰이 고장나서 교체' })
  memo: string;
}
