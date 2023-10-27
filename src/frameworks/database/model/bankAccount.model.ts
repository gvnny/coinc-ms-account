import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BankAccountDocument = BankAccount & Document;

@Schema()
export class BankAccount {
    @Prop()
    _id: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    color: string;

    @Prop({ required: true })
    balance: number;
}

export const BankAccountSchema = SchemaFactory.createForClass(BankAccount);