import { Injectable, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class FavsRepository {
  private _artists: Set<string> = new Set();
  private _albums: Set<string> = new Set();
  private _tracks: Set<string> = new Set();

  getArtistIds(): string[] {
    return Array.from(this._artists);
  }

  getAlbumIds(): string[] {
    return Array.from(this._albums);
  }

  getTrackIds(): string[] {
    return Array.from(this._tracks);
  }

  addArtist(id: string) {
    this._artists.add(id);
  }

  addAlbum(id: string) {
    this._albums.add(id);
  }

  addTrack(id: string) {
    this._tracks.add(id);
  }

  removeArtist(id: string) {
    this._artists.delete(id);
  }

  removeAlbum(id: string) {
    this._albums.delete(id);
  }

  removeTrack(id: string) {
    this._tracks.delete(id);
  }

  checkIfTrackIsFav(trackId: string) {
    if (!this._tracks.has(trackId)) {
      throw new UnprocessableEntityException();
    }
  }

  checkIfAlbumIsFav(albumId: string) {
    if (!this._albums.has(albumId)) {
      throw new UnprocessableEntityException();
    }
  }

  checkIfArtistIsFav(artistId: string) {
    if (!this._artists.has(artistId)) {
      throw new UnprocessableEntityException();
    }
  }
}
