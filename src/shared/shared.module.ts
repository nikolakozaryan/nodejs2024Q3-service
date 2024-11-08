import { Global, Module } from '@nestjs/common';
import { RepositoriesModule } from './repositories/repositories.module';
import { DatabaseModule } from './database/database.module';
import { FavItemTypePipe } from './pipes/fav-item-type.pipe';

@Global()
@Module({
  imports: [RepositoriesModule, DatabaseModule],
  providers: [FavItemTypePipe],
  exports: [RepositoriesModule, DatabaseModule, FavItemTypePipe],
})
export class SharedModule {}
