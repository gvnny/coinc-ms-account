import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BankAccountDocument = BankAccount & Document;

@Schema()
export class BankAccount {
    
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    color: string;

    @Prop({ default: 0 })
    balance: number;

}

export const BankAccountSchema = SchemaFactory.createForClass(BankAccount);