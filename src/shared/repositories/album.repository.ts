import { Injectable } from '@nestjs/common';
import { Album } from '@shared/database/entities';

@Injectable()
export class AlbumRepository {
  private _albums: Album[] = [];
}
