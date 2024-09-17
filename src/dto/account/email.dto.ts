import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class EmailDto {
  @IsEmail(
    { allow_display_name: false },
    { message: '이메일 양식이 올바르지 않습니다.' },
  )
  @MaxLength(30, { message: '이메일 주소가 너무 깁니다.' })
  @IsNotEmpty({ message: '이메일 주소를 입력해주세요.' })
  @ApiProperty({ description: 'Email', example: 'user@moneyboo.com' })
  email: string;
}
