import { Response } from 'express';

import { Controller, HttpStatus, Post, Query, Res } from '@nestjs/common';

import { Public } from 'src/api/account/account.guard';

import { MailService } from './mail.service';

import { MailDto } from 'src/dto/mail/mail.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('메일')
@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('moneyboo/api/send-mail')
  @Public()
  async send(@Res() res: Response, @Query() mailDto: MailDto) {
    if (await this.mailService.send(mailDto)) {
      return res.status(HttpStatus.OK).json({ message: 'ok' });
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: '잘못된 접근입니다.' });
    }
  }
}
