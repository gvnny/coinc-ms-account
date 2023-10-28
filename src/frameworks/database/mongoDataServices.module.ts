import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IDataServices } from '../../core';
import { DB_CONFIG } from '../../configuration';
import {
    BankAccount, BankAccountSchema,
} from './model';
import { MongoDataServices } from './mongoDataServices.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BankAccount.name, schema: BankAccountSchema },
    ]),
    MongooseModule.forRoot(DB_CONFIG.dbConnectionString),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}