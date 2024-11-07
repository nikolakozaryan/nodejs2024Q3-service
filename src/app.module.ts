import { AlbumsModule } from '@modules/albums/albums.module';
import { ArtistsModule } from '@modules/artists/artists.module';
import { FavoritesModule } from '@modules/favorites/favorites.module';
import { TracksModule } from '@modules/tracks/tracks.module';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
  ],
})
export class AppModule {}
