import { BankAccount } from '../entities/';

export class CreateBankAccountRequest {
    name: string;
    color?: string;
    balance: number;
}

export class CreateBankAccountResponse {
    success: boolean;
    bankaccount: BankAccount;
}