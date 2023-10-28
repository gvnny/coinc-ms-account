import { BankAccount } from "../entities";
import { IGenericRepository } from "./genericRepository.abstract";

export abstract class IDataServices {
    abstract bankAccount: IGenericRepository<BankAccount>;
}