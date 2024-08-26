import { Module } from '@nestjs/common';
import { LedgerController } from './ledger.controller';
import './ledger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { Ledger, LedgerSchema } from 'src/schema/ledger/ledger.schema';
import { LedgerService } from './ledger.service';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ledger.name, schema: LedgerSchema }]),
    AccountModule,
  ],
  controllers: [LedgerController],
  providers: [LedgerService],
})
export class LedgerModule {}
