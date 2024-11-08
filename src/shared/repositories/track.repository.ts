import { UpdateTrackDto } from '@modules/track/dto/update-track.dto';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Track } from '@shared/database/entities';

@Injectable()
export class TrackRepository {
  private _tracks: Map<string, Track> = new Map();

  findOne(trackId: string): Track {
    this.checkIfTrackExists(trackId);

    return this._tracks.get(trackId);
  }

  findAll(): Track[] {
    return [...this._tracks.values()];
  }

  findMany(ids: string[]): Track[] {
    return ids.map((id) => this._tracks.get(id));
  }

  create(entity: Track): Track {
    this._tracks.set(entity.id, entity);

    return entity;
  }

  update(trackId: string, dto: UpdateTrackDto): Track {
    this.checkIfTrackExists(trackId);

    const track = this.findOne(trackId);

    this._tracks.set(trackId, Object.assign(track, dto));

    return this._tracks.get(trackId);
  }

  remove(artistId: string): void {
    this.checkIfTrackExists(artistId);

    this._tracks.delete(artistId);
  }

  removeArtist(artistId: string) {
    this._tracks.forEach((value, key) => {
      if (value.artistId === artistId) {
        this._tracks.set(key, Object.assign(value, { artistId: null }));
      }
    });
  }

  removeAlbum(albumId: string) {
    this._tracks.forEach((value, key) => {
      if (value.albumId === albumId) {
        this._tracks.set(key, Object.assign(value, { albumId: null }));
      }
    });
  }

  checkIfTrackExists(trackId: string, checkForFav = false) {
    if (!this._tracks.has(trackId)) {
      const error = checkForFav
        ? new UnprocessableEntityException()
        : new NotFoundException();

      throw error;
    }
  }
}
