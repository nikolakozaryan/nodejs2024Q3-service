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

  async getFavs() {
    return this.favsRepo.findAll();
  }

  async addItem(id: string, itemType: FavItemType) {
    switch (itemType) {
      case 'album':
        await this.albumRepo.checkIfEntityExists(id, true);
        break;
      case 'artist':
        await this.artistRepo.checkIfEntityExists(id, true);
        break;
      case 'track':
        await this.trackRepo.checkIfEntityExists(id, true);
        break;
    }

    await this.favsRepo.add(id, itemType);
  }

  async removeItem(id: string, itemType: FavItemType) {
    await this.favsRepo.checkIsFav(id, itemType);

    await this.favsRepo.remove(id, itemType);
  }
}
