import { AlbumModule } from '@modules/album/album.module';
import { ArtistModule } from '@modules/artist/artist.module';
import { FavsModule } from '@modules/favs/favs.module';
import { TrackModule } from '@modules/track/track.module';
import { UsersModule } from '@modules/users/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavsModule,
    AuthModule,
  ],
})
export class AppModule {}
