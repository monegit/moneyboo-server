import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Confirm {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true, unique: true })
  code: number;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: string;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: string;
}

export const ConfirmSchema = SchemaFactory.createForClass(Confirm);
