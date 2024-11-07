import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [SharedModule],
})
export class ArtistsModule {}
