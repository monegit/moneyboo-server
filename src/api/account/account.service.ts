import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { Account } from 'src/schema/account/account.schema';

import { RegistryDto } from 'src/dto/account/registry.dto';
import { AccountDto } from 'src/dto/account/account.dto';
import { AccessToken } from 'src/types/accessToken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

    const payload: AccessToken = {
      uid: account.id,
      username: account.username,
    };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async validateToken(token: string) {
    try {
      const decoded: AccessToken = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      return decoded;
    } catch {
      throw new Error('Invalid token');
    }
  }
}
