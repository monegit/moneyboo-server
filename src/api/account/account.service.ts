import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Account } from 'src/schema/account/account.schema';

import { AccountDto } from 'src/dto/account/account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
  ) {}

  async createAccount(accountDto: AccountDto): Promise<Account> {
    const createAccount = new this.accountModel(accountDto);

    return await createAccount.save();
  }
}
