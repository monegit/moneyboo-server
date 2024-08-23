import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';

export class AccountDto {
  @IsEmail(
    { allow_display_name: false },
    { message: '이메일 양식이 올바르지 않습니다.' },
  )
  @MaxLength(30, { message: '이메일 주소가 너무 깁니다.' })
  @IsNotEmpty({ message: '이메일 주소를 입력해주세요.' })
  @ApiProperty({ description: 'Email', example: 'user@moneyboo.com' })
  email: string;

  @IsString({ message: '아이디 양식이 올바르지 않습니다.' })
  @Length(1, 15, { message: '아이디 양식이 올바르지 않습니다.' })
  @IsNotEmpty({ message: '아이디를 입력해주세요.' })
  @ApiProperty({ description: 'ID', example: 'example123' })
  user: string;

  @IsStrongPassword(
    { minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    { message: '비밀번호 양식이 올바르지 않습니다.' },
  )
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @ApiProperty({ description: 'Password', example: 'Example11@' })
  password: string;
}
