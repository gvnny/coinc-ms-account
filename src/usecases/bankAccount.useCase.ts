import { Injectable } from '@nestjs/common';
import { BankAccount, IDataServices, CreateBankAccountRequest, CreateBankAccountResponse, UpdateBankAccountRequest, UpdateBankAccountResponse, FindBankAccountByIdResponse } from '../core';
import { BankAccountFactoryService } from './bankAccountFactory.service';

@Injectable()
export class BankAccountUseCase {
    constructor(
        private dataServices: IDataServices,
        private bankAccountFactoryService: BankAccountFactoryService,
    ) {}

    getAllBankAccounts(): Promise<BankAccount[]> {
        return this.dataServices.bankAccount.getAll();
    }

    getBankAccountById(id: string): Promise<BankAccount> {
        return this.dataServices.bankAccount.get(id);
    }

    //checking tomorrow 27-10 so I return the Response DTO instead
    createBankAccount(createBankAccountRequest: CreateBankAccountRequest): Promise<BankAccount> {
        const bankAccount = this.bankAccountFactoryService.createBankAccount(createBankAccountRequest);
        return this.dataServices.bankAccount.create(bankAccount);
    }

    updateBankAccount(id: string, updateBankAccountRequest: UpdateBankAccountRequest): Promise<BankAccount> {
        const bankAccount = this.bankAccountFactoryService.updateBankAccount(updateBankAccountRequest);
        return this.dataServices.bankAccount.update(id, bankAccount);
    }

    deleteBankAccount(id: string): Promise<BankAccount> {
        return this.dataServices.bankAccount.delete(id);
    }
}