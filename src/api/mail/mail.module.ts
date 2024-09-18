import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Confirm, ConfirmSchema } from 'src/schema/account/configm.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Confirm.name, schema: ConfirmSchema }]),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
