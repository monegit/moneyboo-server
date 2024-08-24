import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { Account } from 'src/schema/account/account.schema';

import { RegistryDto } from 'src/dto/account/registry.dto';
import { AccountDto } from 'src/dto/account/account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount(registryDto: RegistryDto): Promise<Account> {
    const account = new this.accountModel(registryDto);

    return await account.save();
  }

  async tryLogin(accountDto: AccountDto) {
    const account = await this.accountModel.findOne({
      username: accountDto.username,
      password: accountDto.password,
    });

    if (!account) throw new UnauthorizedException();

    const payload = { sub: account.id, account: account.username };
    return { token: await this.jwtService.signAsync(payload) };
  }
}
