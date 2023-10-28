import { Injectable } from '@nestjs/common';
import { BankAccount } from '../core';
import { CreateBankAccountRequest } from './createBankAccount';
import { UpdateBankAccountRequest } from './updateBankAccount';

@Injectable()
export class BankAccountFactoryService {
    createBankAccount(createBankAccountRequest: CreateBankAccountRequest) {
        const bankAccount = new BankAccount();

        bankAccount.userId = createBankAccountRequest.userId;
        bankAccount.name = createBankAccountRequest.name;
        bankAccount.color = createBankAccountRequest.color;
        bankAccount.balance = createBankAccountRequest.balance;

        return bankAccount;
    }

    //probably not exactly like this, I'll check it out tomorrow 27-10
    updateBankAccount(updateBankAccountRequest: UpdateBankAccountRequest) {
        const bankAccount = new BankAccount();

        bankAccount.name = updateBankAccountRequest.name;
        bankAccount.color = updateBankAccountRequest.color;
        bankAccount.balance = updateBankAccountRequest.balance;

        return bankAccount;
    }
}