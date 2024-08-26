import { Controller, Get, Post, Query, Req } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { LedgerDto } from 'src/dto/ledger/ledger.dto';

@Controller('ledger')
export class LedgerController {
  constructor(private ledgerService: LedgerService) {}

  @Post('moneyboo/api/spent')
  @ApiTags('가계부')
  async postSpent(@Query() ledgerDto: LedgerDto) {
    return await this.ledgerService.postSpent(ledgerDto);
  }

  @Get('moneyboo/api/calendar')
  @ApiTags('가계부')
  @ApiHeader({ name: 'Authorization' })
  async getLedger(@Req() token: string) {
    return await this.ledgerService.getLedger(token['token']);
  }
}
