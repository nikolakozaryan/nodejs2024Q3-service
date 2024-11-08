import { ITrack } from '@core/interfaces/track.interface';
import { randomUUID } from 'crypto';

export class Track implements ITrack {
  id: string;
  name: string;
  artistId: string;
  albumId: string;
  duration: number;

  constructor(
    name: string,
    artistId: string,
    albumId: string,
    duration: number,
  ) {
    Object.assign(this, {
      id: randomUUID(),
      name,
      artistId,
      albumId,
      duration,
    });
  }
}
