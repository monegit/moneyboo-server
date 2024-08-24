import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { createHash } from 'crypto';
import { Document } from 'mongoose';

@Schema()
export class Account extends Document {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  async comparePassword(password: string) {
    const hashedPassword = createHash('sha256')
      .update(password)
      .digest('base64');

    console.log(hashedPassword, this.password);
    return hashedPassword === this.password;
  }

  async hashPassword() {
    this.password = createHash('sha256').update(this.password).digest('base64');
  }
}

export const AccountSchema = SchemaFactory.createForClass(Account);
