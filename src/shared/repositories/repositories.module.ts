import { Module } from '@nestjs/common';
import { AlbumRepository } from './album.repository';
import { ArtistRepository } from './artist.repository';
import { FavsRepository } from './favs.repository';
import { TrackRepository } from './track.repository';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from '@shared/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature(Object.values(entities))],
  providers: [
    UserRepository,
    AlbumRepository,
    ArtistRepository,
    FavsRepository,
    TrackRepository,
  ],
  exports: [
    UserRepository,
    AlbumRepository,
    ArtistRepository,
    FavsRepository,
    TrackRepository,
  ],
})
export class RepositoriesModule {}
