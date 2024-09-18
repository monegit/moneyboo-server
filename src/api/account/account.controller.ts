import { Response } from 'express';
import { Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from './account.guard';

import { AccountService } from './account.service';

import { EmailDto } from 'src/dto/common/email.dto';
import { RegistryDto } from 'src/dto/account/registry.dto';
import { AccountDto } from 'src/dto/account/account.dto';
import { CodeDto } from 'src/dto/account/code.dto';

@ApiTags('계정')
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('moneyboo/api/send-code')
  @Public()
  async sendCode(@Res() res: Response, @Query() confirmDto: EmailDto) {
    if (await this.accountService.sendCode(confirmDto)) {
      return res.status(HttpStatus.OK).json({ message: 'ok' });
    } else {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'fail' });
    }
  }

  @Post('moneyboo/api/confirm-code')
  @Public()
  async confirmCode(@Res() res: Response, @Query() confirmDto: CodeDto) {
    if (await this.accountService.confirmCode(confirmDto)) {
      return res.status(HttpStatus.OK).json({ message: 'ok' });
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'fail' });
    }
  }

  @Post('moneyboo/api/registry')
  @Public()
  async createAccount(@Query() accountDto: RegistryDto) {
    return await this.accountService.createAccount(accountDto);
  }

  @Get('moneyboo/api/login')
  @Public()
  async tryLogin(@Query() accountDto: AccountDto) {
    return await this.accountService.tryLogin(accountDto);
  }
}
