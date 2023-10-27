import { Module } from '@nestjs/common';
import { DataServicesModule } from '../services/database/dataServices.module';
import { BankAccountFactoryService } from './bankAccountFactory.service';
import { BankAccountUseCase } from './bankAccount.useCase';

@Module({
    imports: [DataServicesModule],
    providers: [BankAccountFactoryService, BankAccountUseCase],
    exports: [BankAccountFactoryService, BankAccountUseCase],
})
export class BankAccountUseCaseModule {}