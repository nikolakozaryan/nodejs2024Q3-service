import { IAlbum } from '@core/interfaces/album.interface';
import { randomUUID } from 'crypto';

export class Album implements IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string;

  constructor(name: string, year: number, artistId: string) {
    Object.assign(this, { id: randomUUID(), name, year, artistId });
  }
}
