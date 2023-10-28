import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../core';
import { FindBankAccountByIdResponse } from './findBankAccountById.dto';

@Injectable()
export class FindBankAccountByIdUseCase {
    constructor(
        private dataServices: IDataServices,
    ) {}

    async execute(id: string): Promise<FindBankAccountByIdResponse> {
        try{
            const bankAccount = await this.dataServices.bankAccount.get(id);

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

}