import { BankAccount } from '../entities/';

export class UpdateBankAccountRequest {
    _id: string;
    name?: string;
    color?: string;
    balance?: number;
}

export class UpdateBankAccountResponse {
    success: boolean;
    bankaccount: BankAccount;
}