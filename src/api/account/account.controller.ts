import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from './account.guard';
import { RegistryDto } from 'src/dto/account/registry.dto';

import { AccountService } from './account.service';
import { AccountDto } from 'src/dto/account/account.dto';

@ApiTags('계정')
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

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
