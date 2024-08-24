import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import './account.middleware';

import { Account, AccountSchema } from 'src/schema/account/account.schema';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
  providers: [AccountService],
})
export class AccountModule {}
