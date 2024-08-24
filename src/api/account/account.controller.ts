import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RegistryDto } from 'src/dto/account/registry.dto';

import { AccountService } from './account.service';
import { AccountDto } from 'src/dto/account/account.dto';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('moneyboo/api/account/registry')
  @ApiTags('Account')
  async createAccount(@Query() accountDto: RegistryDto) {
    return await this.accountService.createAccount(accountDto);
  }

  @Get('moneyboo/api/account/login')
  @ApiTags('Account')
  async tryLogin(@Query() accountDto: AccountDto) {
    return await this.accountService.tryLogin(accountDto);
  }
}
