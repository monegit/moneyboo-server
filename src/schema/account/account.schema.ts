import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { createHash } from 'crypto';
import { Document } from 'mongoose';

@Schema()
export class Account extends Document {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ unique: true, required: true })
  user: string;

  @Prop({ required: true })
  password: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

AccountSchema.pre('save', function (next) {
  if (this.isModified('password') || this.isNew) {
    // Hash Password
    this.password = createHash('sha256').update(this.password).digest('base64');
  }

  next();
});
