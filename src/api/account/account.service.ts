import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Account } from 'src/schema/account/account.schema';

import { RegistryDto } from 'src/dto/account/registry.dto';
import { AccountDto } from 'src/dto/account/account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
  ) {}

  async createAccount(registryDto: RegistryDto): Promise<Account> {
    const account = new this.accountModel(registryDto);

    return await account.save();
  }

  async tryLogin(accountDto: AccountDto) {
    const account = await this.accountModel.findOne({
      user: accountDto.user,
    });

    if (account) return true;
    else return false;
  }
}
