import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackRepository } from '@shared/repositories/track.repository';

@Injectable()
export class TrackService {
  constructor(private trackRepo: TrackRepository) {}

  async create(dto: CreateTrackDto) {
    return this.trackRepo.create(dto);
  }

  async findAll() {
    return this.trackRepo.findAll();
  }

  async findOne(id: string) {
    await this.checkIfEntityExists(id);

    return this.trackRepo.findOne(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    await this.checkIfEntityExists(id);

    return this.trackRepo.update(id, updateTrackDto);
  }

  async remove(id: string) {
    await this.checkIfEntityExists(id);

    await this.trackRepo.remove(id);
  }

  private async checkIfEntityExists(id: string) {
    await this.trackRepo.checkIfEntityExists(id);
  }
}
