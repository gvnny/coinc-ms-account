import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../core';
import { UpdateBankAccountRequest, UpdateBankAccountResponse } from './updateBankAccount.dto';
import { BankAccountFactoryService } from '../bankAccountFactory.service';

@Injectable()
export class UpdateBankAccountUseCase {
    constructor(
        private dataServices: IDataServices,
        private bankAccountFactoryService: BankAccountFactoryService,
    ) {}

    async execute(id: string, updateBankAccountRequest: UpdateBankAccountRequest): Promise<UpdateBankAccountResponse> {
        try{
            const bankAccount = this.bankAccountFactoryService.updateBankAccount(updateBankAccountRequest);
            const updatedBankAccount = await this.dataServices.bankAccount.update(id, bankAccount);

            if(updatedBankAccount) {
                const response: UpdateBankAccountResponse = {
                    success: true,
                    message: `Bank Account ${updateBankAccountRequest.name} updated successfully`,
                }

                return response
            } else {
                const response: UpdateBankAccountResponse = {
                    success: false,
                    message: 'Bank Account update failed',
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