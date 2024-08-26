import { Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { LedgerService } from './ledger.service';
import { LedgerDto } from 'src/dto/ledger/ledger.dto';

@ApiTags('가계부')
@ApiBearerAuth()
@Controller('ledger')
export class LedgerController {
  constructor(private ledgerService: LedgerService) {}

  @Post('moneyboo/api/spent')
  async postSpent(@Query() ledgerDto: LedgerDto, @Req() token: string) {
    return await this.ledgerService.postSpent(ledgerDto, token);
  }

  @Get('moneyboo/api/calendar')
  async getLedger(@Req() token: string) {
    return await this.ledgerService.getLedger(token['token']);
  }
}
