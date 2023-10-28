import { Injectable } from '@nestjs/common';
import { BankAccount, IDataServices } from '../../core';

@Injectable()
export class FindAllBankAccountUseCase {
    constructor(
        private dataServices: IDataServices,
    ) {}

    async execute(): Promise<BankAccount[]> {
        return this.dataServices.bankAccount.getAll();
    }
}