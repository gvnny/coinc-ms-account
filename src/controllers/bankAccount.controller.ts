import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CreateBankAccountRequest, UpdateBankAccountRequest } from '../core';
import { BankAccountUseCase } from '../usecases';

@Controller('api/coinc-ms-bankaccounts')
export class BankAccountController {
    constructor(private bankAccountUseCases: BankAccountUseCase) {}

    @Get()
    async getAllBankAccounts() {
        return this.bankAccountUseCases.getAllBankAccounts();
    }

    @Get(':id')
    async getBankAccountById(@Param('id') id: string) {
        return this.bankAccountUseCases.getBankAccountById(id);
    }

    @Post()
    async createBankAccount(@Body() bankaccount: CreateBankAccountRequest) {
        return this.bankAccountUseCases.createBankAccount(bankaccount);
    }

    @Put(':id')
    async updateBankAccount(
        @Param('id') id: string,
        @Body() bankaccount: UpdateBankAccountRequest,
    ) {
        return this.bankAccountUseCases.updateBankAccount(id, bankaccount);
    }

    @Delete(':id')
    async deleteBankAccount(@Param('id') id: string) {
        return this.bankAccountUseCases.deleteBankAccount(id);
    }
}
