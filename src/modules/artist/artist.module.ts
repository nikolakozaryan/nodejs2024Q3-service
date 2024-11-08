import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [SharedModule],
})
export class ArtistModule {}
