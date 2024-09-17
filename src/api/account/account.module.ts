import './account.middleware';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { Account, AccountSchema } from 'src/schema/account/account.schema';
import { Confirm, ConfirmSchema } from 'src/schema/account/configm.schema';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountGuard } from './account.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    MongooseModule.forFeature([{ name: Confirm.name, schema: ConfirmSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        global: true,
      }),
    }),
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    {
      provide: APP_GUARD,
      useClass: AccountGuard,
    },
  ],
  exports: [AccountService],
})
export class AccountModule {}
