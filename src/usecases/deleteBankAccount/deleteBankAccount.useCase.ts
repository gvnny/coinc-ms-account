import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../core';
import { DeleteBankAccountResponse } from './deleteBankAccount.dto';

@Injectable()
export class DeleteBankAccountUseCase {
    constructor(
        private dataServices: IDataServices,
    ) {}

    async execute(id: string): Promise<DeleteBankAccountResponse> {
        try{
            const deletedBankAccount = await this.dataServices.bankAccount.delete(id);

            if(deletedBankAccount) {
                const response: DeleteBankAccountResponse = {
                    success: true,
                    message: `Bank Account deleted successfully`,
                }

                return response
            } else {
                const response: DeleteBankAccountResponse = {
                    success: false,
                    message: 'Bank Account deletion failed',
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
}