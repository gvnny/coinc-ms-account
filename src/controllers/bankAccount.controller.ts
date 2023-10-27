import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CreateBankAccountRequest, CreateBankAccountResponse, FindBankAccountByIdResponse, UpdateBankAccountRequest } from '../core';
import { BankAccountUseCase } from '../usecases';

@Controller('api/coinc-ms-bankaccounts')
export class BankAccountController {
    constructor(private bankAccountUseCases: BankAccountUseCase) {}

    @Get()
    async getAllBankAccounts() {
        return this.bankAccountUseCases.getAllBankAccounts();
    }

    @Get(':id')
    async getBankAccountById(@Param('id') id: string): Promise<FindBankAccountByIdResponse> {
        try{
            const bankAccount = await this.bankAccountUseCases.getBankAccountById(id);
    
            if (bankAccount) {
                const response: FindBankAccountByIdResponse = {
                    success: true,
                    message: 'Bank Account found',
                    bankAccount: bankAccount,
                };
    
                return response;
            } else {
                const response: FindBankAccountByIdResponse = {
                    success: false,
                    message: 'Bank Account not found',
                };
    
                return response;
            }
        } catch(e){
            return {
                success: false,
                message: 'Invalid parameter',
            }
        }
    }

    @Post()
    async createBankAccount(
        @Body() createBankAccountRequest: CreateBankAccountRequest): Promise<CreateBankAccountResponse> {
        
            try {
                const bankAccount = await this.bankAccountUseCases.createBankAccount(createBankAccountRequest);
                
                if(bankAccount) {
                    const response: CreateBankAccountResponse = {
                        success: true,
                        message: `Bank Account ${createBankAccountRequest.name} created successfully`,
                    }

                    return response
                } else {
                    const response: CreateBankAccountResponse = {
                        success: false,
                        message: 'Bank Account creation failed',
                    }

                    return response
                }
            } catch (e) {
                return {
                    success: false,
                    message: 'Invalid parameter',
                }
            }
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
