import { Injectable } from '@nestjs/common';
import { Track } from '@shared/database/entities';

@Injectable()
export class TrackRepository {
  private tracks: Track[] = [];
}
