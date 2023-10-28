import { BankAccount } from "../../core/entities";

export type FindBankAccountByIdResponse = {
    success: boolean;
    message: string;
    bankAccount?: BankAccount;
};