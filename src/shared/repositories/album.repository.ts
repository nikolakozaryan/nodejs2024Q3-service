import { UpdateAlbumDto } from '@modules/album/dto/update-album.dto';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Album } from '@shared/database/entities';

@Injectable()
export class AlbumRepository {
  private _albums: Map<string, Album> = new Map();

  findOne(albumId: string): Album {
    return this._albums.get(albumId);
  }

  findAll(): Album[] {
    return [...this._albums.values()];
  }

  findMany(ids: string[]): Album[] {
    return ids.map((id) => this._albums.get(id));
  }

  create(entity: Album): Album {
    this._albums.set(entity.id, entity);

    return entity;
  }

  update(albumId: string, dto: UpdateAlbumDto): Album {
    const album = this.findOne(albumId);

    this._albums.set(albumId, Object.assign(album, dto));

    return this._albums.get(albumId);
  }

  remove(albumId: string): void {
    this._albums.delete(albumId);
  }

  removeArtist(artistId: string) {
    this._albums.forEach((value, key) => {
      if (value.artistId === artistId) {
        this._albums.set(key, Object.assign(value, { artistId: null }));
      }
    });
  }

  checkIfAlbumExists(albumId: string, checkForFav = false) {
    if (!this._albums.has(albumId)) {
      const error = checkForFav
        ? new UnprocessableEntityException()
        : new NotFoundException();

      throw error;
    }
  }
}
