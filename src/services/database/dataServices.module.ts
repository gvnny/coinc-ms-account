import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from '../../frameworks/database/mongoDataServices.module';

@Module({
    imports: [MongoDataServicesModule],
    exports: [MongoDataServicesModule],
})
export class DataServicesModule {}