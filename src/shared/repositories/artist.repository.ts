import { Injectable } from '@nestjs/common';
import { Artist } from '@shared/database/entities';

@Injectable()
export class ArtistRepository {
  private _artists: Artist[] = [];
}
