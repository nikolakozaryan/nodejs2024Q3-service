import { Module } from '@nestjs/common';
import { AlbumRepository } from './album.repository';
import { ArtistRepository } from './artist.repository';
import { FavsRepository } from './favs.repository';
import { TrackRepository } from './track.repository';
import { UserRepository } from './user.repository';

@Module({
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
