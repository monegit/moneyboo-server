import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import './account.middleware';

import { Account, AccountSchema } from 'src/schema/account/account.schema';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
