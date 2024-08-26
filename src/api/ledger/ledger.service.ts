import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LedgerDto } from 'src/dto/ledger/ledger.dto';
import { Ledger } from 'src/schema/ledger/ledger.schema';
import { AccountService } from '../account/account.service';

@Injectable()
export class LedgerService {
  constructor(
    @InjectModel(Ledger.name) private readonly ledgerModel: Model<Ledger>,
    private accountService: AccountService,
  ) {}

  async postSpent(ledgerDto: LedgerDto) {
    const ledger = new this.ledgerModel(ledgerDto);

    return await ledger.save();
  }

  async getLedger(token: string) {
    const ledger = await this.ledgerModel.find({
      uid: (await this.accountService.validateToken(token)).uid,
    });
    return ledger;
  }
}
