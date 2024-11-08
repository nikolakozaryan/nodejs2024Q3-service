import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackRepository } from '@shared/repositories/track.repository';
import { FavsRepository } from '@shared/repositories/favs.repository';
import { Track } from '@shared/database/entities';

@Injectable()
export class TrackService {
  constructor(
    private trackRepo: TrackRepository,
    private favsRepo: FavsRepository,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    const { name, duration, albumId, artistId } = createTrackDto;

    const entity = new Track(name, artistId, albumId, duration);
    return this.trackRepo.create(entity);
  }

  findAll() {
    return this.trackRepo.findAll();
  }

  findOne(id: string) {
    this.checkIfTrackExists(id);

    return this.trackRepo.findOne(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    this.checkIfTrackExists(id);

    return this.trackRepo.update(id, updateTrackDto);
  }

  remove(id: string) {
    this.checkIfTrackExists(id);

    this.favsRepo.removeTrack(id);

    this.trackRepo.remove(id);
  }

  private checkIfTrackExists(id: string) {
    this.trackRepo.checkIfTrackExists(id);
  }
}
