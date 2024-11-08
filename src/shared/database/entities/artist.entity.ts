import { IArtist } from '@core/interfaces/artist.interface';
import { randomUUID } from 'crypto';

export class Artist implements IArtist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(name: string, grammy: boolean) {
    Object.assign(this, {
      id: randomUUID(),
      name,
      grammy,
    });
  }
}
