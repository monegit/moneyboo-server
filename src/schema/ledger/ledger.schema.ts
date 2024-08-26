import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Ledger {
  @Prop({ required: true })
  uid: string;

  @Prop({ required: true })
  place: string;

  @Prop({ required: true })
  goodsName: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  date: string;

  @Prop()
  memo: string;
}

export const LedgerSchema = SchemaFactory.createForClass(Ledger);
