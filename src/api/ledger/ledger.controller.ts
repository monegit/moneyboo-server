import { Controller, Get, Post, Query } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { LedgerDto } from 'src/dto/ledger/ledger.dto';

@Controller('ledger')
export class LedgerController {
  constructor(private ledgerService: LedgerService) {}

  @Post('moneyboo/api/spent')
  @ApiTags('Ledger')
  async postSpent(@Query() ledgerDto: LedgerDto) {
    return await this.ledgerService.postSpent(ledgerDto);
  }

  @Get('moneyboo/api/ledger')
  @ApiTags('Ledger')
  @ApiQuery({
    name: 'token',
    type: String,
  })
  async getLedger(@Query('token') token: string) {
    return await this.ledgerService.getLedger(token);
  }
}
