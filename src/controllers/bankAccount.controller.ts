import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CreateBankAccountRequest, CreateBankAccountResponse, FindBankAccountByIdResponse, UpdateBankAccountRequest } from '../usecases';
import { CreateBankAccountUseCase, UpdateBankAccountUseCase, DeleteBankAccountUseCase, FindAllBankAccountUseCase, FindBankAccountByIdUseCase } from '../usecases';

@Controller('api/coinc-ms-bankaccounts')
export class BankAccountController {
    constructor(
        private createBankAccountUseCase: CreateBankAccountUseCase,
        private updateBankAccountUseCase: UpdateBankAccountUseCase,
        private deleteBankAccountUseCase: DeleteBankAccountUseCase,
        private findAllBankAccountUseCase: FindAllBankAccountUseCase,
        private findBankAccountByIdUseCase: FindBankAccountByIdUseCase
        ) {}

    @Get()
    async findAllBankAccounts() {
        return this.findAllBankAccountUseCase.execute();
    }

    @Get(':id')
    async findBankAccountById(@Param('id') id: string): Promise<FindBankAccountByIdResponse> {
        try{
            const bankAccount = await this.findBankAccountByIdUseCase.execute(id);
    
            if (bankAccount) {
                const response: FindBankAccountByIdResponse = {
                    success: true,
                    message: 'Bank Account found',
                    bankAccount: bankAccount.bankAccount,
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
                const bankAccount = await this.createBankAccountUseCase.execute(createBankAccountRequest);
                
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
        return this.updateBankAccountUseCase.execute(id, bankaccount);
    }

    @Delete(':id')
    async deleteBankAccount(@Param('id') id: string) {
        return this.deleteBankAccountUseCase.execute(id);
    }
}
