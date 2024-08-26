import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RegistryDto } from 'src/dto/account/registry.dto';

import { AccountService } from './account.service';
import { AccountDto } from 'src/dto/account/account.dto';
import { Public } from './account.guard';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('moneyboo/api/registry')
  @ApiTags('Account')
  @Public()
  async createAccount(@Query() accountDto: RegistryDto) {
    return await this.accountService.createAccount(accountDto);
  }

  @Get('moneyboo/api/login')
  @ApiTags('Account')
  @Public()
  async tryLogin(@Query() accountDto: AccountDto) {
    return await this.accountService.tryLogin(accountDto);
  }
}
