import { Global, Module } from '@nestjs/common';
import { RepositoriesModule } from './repositories/repositories.module';
import { DatabaseModule } from './database/database.module';

@Global()
@Module({
  imports: [RepositoriesModule, DatabaseModule],
  exports: [RepositoriesModule, DatabaseModule],
})
export class SharedModule {}
