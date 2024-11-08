import { FavItemType } from '@core/types';
import { Injectable } from '@nestjs/common';
import { AlbumRepository } from '@shared/repositories/album.repository';
import { ArtistRepository } from '@shared/repositories/artist.repository';
import { FavsRepository } from '@shared/repositories/favs.repository';
import { TrackRepository } from '@shared/repositories/track.repository';

@Injectable()
export class FavsService {
  constructor(
    private favsRepo: FavsRepository,
    private trackRepo: TrackRepository,
    private albumRepo: AlbumRepository,
    private artistRepo: ArtistRepository,
  ) {}

  getFavs() {
    return {
      artists: this.artistRepo.findMany(this.favsRepo.getArtistIds()),
      albums: this.albumRepo.findMany(this.favsRepo.getAlbumIds()),
      tracks: this.trackRepo.findMany(this.favsRepo.getTrackIds()),
    };
  }

  addItem(id: string, itemType: FavItemType) {
    switch (itemType) {
      case 'album':
        this.albumRepo.checkIfAlbumExists(id, true);

        this.favsRepo.addAlbum(id);
        break;
      case 'artist':
        this.artistRepo.checkIfArtistExists(id, true);
        this.favsRepo.addArtist(id);
        break;
      case 'track':
        this.trackRepo.checkIfTrackExists(id, true);
        this.favsRepo.addTrack(id);
        break;
    }
  }

  removeItem(id: string, itemType: FavItemType) {
    switch (itemType) {
      case 'album':
        this.favsRepo.checkIfAlbumIsFav(id);
        this.favsRepo.removeAlbum(id);
        break;
      case 'artist':
        this.favsRepo.checkIfArtistIsFav(id);
        this.favsRepo.removeArtist(id);
        break;
      case 'track':
        this.favsRepo.checkIfTrackIsFav(id);
        this.favsRepo.removeTrack(id);
        break;
    }
  }
}
