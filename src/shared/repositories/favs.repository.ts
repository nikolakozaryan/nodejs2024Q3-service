import { Injectable } from '@nestjs/common';
import { Artist, Album, Track } from '@shared/database/entities';

@Injectable()
export class FavsRepository {
  _artists: Artist[] = [];
  _albums: Album[] = [];
  _tracks: Track[] = [];
}
