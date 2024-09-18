import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailDto {
  @IsEmail(
    {
      allow_display_name: false, // '이름 <email@email.com>' 방지
      allow_ip_domain: false, // IP 도메인 금지
    },
    { message: '이메일 양식이 올바르지 않습니다.' },
  )
  @IsNotEmpty({ message: '이메일 주소를 입력해주세요.' })
  @ApiProperty({ description: 'Email', example: 'user@moneyboo.com' })
  email: string;
}
