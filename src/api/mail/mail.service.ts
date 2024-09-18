import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Confirm } from 'src/schema/account/configm.schema';

import { EmailDto } from 'src/dto/common/email.dto';
import { MailDto } from 'src/dto/mail/mail.dto';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(Confirm.name) private readonly confirmModel: Model<Confirm>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  private async validateEmailRegistry(emailDto: EmailDto): Promise<boolean> {
    if (await this.confirmModel.exists({ email: emailDto.email })) {
      return true;
    } else {
      return false;
    }
  }

  async send(mailDto: MailDto) {
    if (await this.validateEmailRegistry({ email: mailDto.email })) {
      const mailOption = {
        from: `머니부 ${process.env.MAIL_USER}`,
        to: mailDto.email,
        subject: mailDto.title,
        text: mailDto.body,
      };

      await this.transporter.sendMail(mailOption);

      return true;
    } else {
      return false;
    }
  }
}
