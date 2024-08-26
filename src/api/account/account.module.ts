import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import './account.middleware';

import { Account, AccountSchema } from 'src/schema/account/account.schema';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccountGuard } from './account.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
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
