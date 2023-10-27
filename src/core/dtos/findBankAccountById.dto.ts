import { BankAccount } from "../entities/";

export type FindBankAccountByIdResponse = {
    success: boolean;
    message: string;
    bankAccount?: BankAccount;
};