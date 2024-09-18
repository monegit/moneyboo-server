import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { EmailDto } from '../common/email.dto';

export class MailDto extends EmailDto {
  @IsNumberString()
  @IsNotEmpty({ message: '코드를 입력해주세요.' })
  @Length(6, 6, { message: '코드의 길이는 6자리 입니다.' })
  @ApiProperty({ description: '인증코드', example: '000000' })
  code: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '제목', example: "'머니부' 회원가입 인증 코드" })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '내용', example: "인증 코드는 '000000' 입니다." })
  body: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '내용(HTML)', required: false, nullable: true })
  html: string | null;
}
