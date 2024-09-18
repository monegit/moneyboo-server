import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { EmailDto } from '../common/email.dto';

export class RegistryDto extends EmailDto {
  @IsString({ message: '아이디 양식이 올바르지 않습니다.' })
  @Length(1, 15, { message: '아이디 양식이 올바르지 않습니다.' })
  @IsNotEmpty({ message: '아이디를 입력해주세요.' })
  @ApiProperty({ description: 'ID', example: 'example123' })
  username: string;

  @IsStrongPassword(
    { minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    { message: '비밀번호 양식이 올바르지 않습니다.' },
  )
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @ApiProperty({ description: 'Password', example: 'Example11@' })
  password: string;
}
