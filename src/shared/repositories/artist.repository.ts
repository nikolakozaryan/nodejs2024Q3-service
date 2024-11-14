import { UpdateArtistDto } from '@modules/artist/dto/update-artist.dto';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Artist } from '@shared/database/entities';

@Injectable()
export class ArtistRepository {
  private _artists: Map<string, Artist> = new Map();

  findOne(artistId: string): Artist {
    this.checkIfArtistExists(artistId);

    return this._artists.get(artistId);
  }

  findAll(): Artist[] {
    return [...this._artists.values()];
  }

  findMany(ids: string[]): Artist[] {
    return ids.map((id) => this._artists.get(id));
  }

  create(entity: Artist): Artist {
    this._artists.set(entity.id, entity);

    return entity;
  }

  update(artistId: string, dto: UpdateArtistDto): Artist {
    this.checkIfArtistExists(artistId);

    const artist = this.findOne(artistId);

    this._artists.set(artistId, Object.assign(artist, dto));

    return this._artists.get(artistId);
  }

  remove(artistId: string): void {
    this.checkIfArtistExists(artistId);

    this._artists.delete(artistId);
  }

  checkIfArtistExists(artistId: string, checkForFav = false) {
    if (!this._artists.has(artistId)) {
      const error = checkForFav
        ? new UnprocessableEntityException()
        : new NotFoundException();

      throw error;
    }
  }
}
