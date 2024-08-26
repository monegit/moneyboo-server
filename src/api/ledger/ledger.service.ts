import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Ledger } from 'src/schema/ledger/ledger.schema';
import { LedgerDto } from 'src/dto/ledger/ledger.dto';

import { AccountService } from '../account/account.service';

@Injectable()
export class LedgerService {
  constructor(
    @InjectModel(Ledger.name) private readonly ledgerModel: Model<Ledger>,
    private accountService: AccountService,
  ) {}

  async postSpent(ledgerDto: LedgerDto, token: string) {
    ledgerDto.uid = (
      await this.accountService.validateToken(token['token'])
    ).uid;
    const ledger = new this.ledgerModel(ledgerDto);

    await ledger.save();
  }

  async getLedger(token: string) {
    const ledger = await this.ledgerModel.find({
      uid: (await this.accountService.validateToken(token)).uid,
    });
    return ledger;
  }
}
