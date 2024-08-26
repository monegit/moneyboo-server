import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AccountModule } from './api/account/account.module';
import { LedgerModule } from './api/ledger/ledger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_HOST),
    AccountModule,
    LedgerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
