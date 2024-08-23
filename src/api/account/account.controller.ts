import { Controller, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AccountDto } from 'src/dto/account/account.dto';

import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('moneyboo/api/account/registry')
  @ApiTags('Account')
  async createAccount(@Query() accountDto: AccountDto) {
    return await this.accountService.createAccount(accountDto);
  }
}
