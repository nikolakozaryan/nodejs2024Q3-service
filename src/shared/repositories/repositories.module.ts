import { Module } from '@nestjs/common';
import { AlbumsRepository } from './albums.repository';
import { ArtistsRepository } from './artists.repository';
import { FavoritesRepository } from './favorites.repository';
import { TracksRepository } from './tracks.repository';
import { UsersRepository } from './users.repository';

@Module({
  providers: [
    UsersRepository,
    AlbumsRepository,
    ArtistsRepository,
    FavoritesRepository,
    TracksRepository,
  ],
  exports: [
    UsersRepository,
    AlbumsRepository,
    ArtistsRepository,
    FavoritesRepository,
    TracksRepository,
  ],
})
export class RepositoriesModule {}
