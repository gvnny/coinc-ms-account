import { Module } from '@nestjs/common';
import { DataServicesModule } from '../services/database/dataServices.module';
import { BankAccountFactoryService } from './bankAccountFactory.service';
import { CreateBankAccountUseCase } from './createBankAccount';
import { FindAllBankAccountUseCase } from './findAllBankAccount';
import { FindBankAccountByIdUseCase } from './findBankAccountById';
import { UpdateBankAccountUseCase } from './updateBankAccount';
import { DeleteBankAccountUseCase } from './deleteBankAccount';

@Module({
    imports: [DataServicesModule],
    providers: [BankAccountFactoryService, CreateBankAccountUseCase, FindAllBankAccountUseCase, FindBankAccountByIdUseCase, UpdateBankAccountUseCase, DeleteBankAccountUseCase],
    exports: [BankAccountFactoryService, CreateBankAccountUseCase, FindAllBankAccountUseCase, FindBankAccountByIdUseCase, UpdateBankAccountUseCase, DeleteBankAccountUseCase],
})
export class BankAccountUseCaseModule {}