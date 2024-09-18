import { Model } from 'mongoose';
import * as moment from 'moment';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { Account } from 'src/schema/account/account.schema';
import { Confirm } from 'src/schema/account/configm.schema';

import { EmailDto } from 'src/dto/common/email.dto';
import { RegistryDto } from 'src/dto/account/registry.dto';
import { AccountDto } from 'src/dto/account/account.dto';
import { CodeDto } from 'src/dto/account/code.dto';

import { AccessToken } from 'src/types/accessToken';

function getRandomCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

@Injectable()
export class AccountService {
  code: number;

  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
    @InjectModel(Confirm.name) private readonly confirmModel: Model<Confirm>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async sendCode(emailDto: EmailDto): Promise<boolean> {
    const startDate = moment().format('YYYY-MM-DD HH:mm:ss');
    const endDate = moment(startDate)
      .add(5, 'minutes')
      .format('YYYY-MM-DD HH:mm:ss');

    if (
      (await this.confirmModel.find({ email: emailDto.email })).length <= 10
    ) {
      const code = getRandomCode();

      const confirm = new this.confirmModel({
        ...emailDto,
        code: code,
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(startDate).format('HH:mm:ss'),
        startTime: moment(endDate).format('YYYY-MM-DD'),
        endTime: moment(endDate).format('HH:mm:ss'),
      });

      await confirm.save();

      return true;
    } else {
      return false;
    }
  }

  async confirmCode(codeDto: CodeDto): Promise<boolean> {
    if (await this.confirmModel.exists(codeDto)) {
      await this.confirmModel.deleteOne(codeDto);
      return true;
    } else {
      return false;
    }
  }

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
