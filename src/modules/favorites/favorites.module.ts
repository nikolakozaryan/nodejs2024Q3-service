import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [SharedModule],
})
export class FavoritesModule {}
