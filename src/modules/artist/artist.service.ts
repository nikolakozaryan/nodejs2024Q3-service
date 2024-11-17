import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from '@shared/repositories/artist.repository';

@Injectable()
export class ArtistService {
  constructor(private artistRepo: ArtistRepository) {}

  async create(dto: CreateArtistDto) {
    return this.artistRepo.create(dto);
  }

  async findAll() {
    return this.artistRepo.findAll();
  }

  async findOne(id: string) {
    await this.artistRepo.checkIfEntityExists(id);

    return this.artistRepo.findOne(id);
  }

  async update(id: string, dto: UpdateArtistDto) {
    await this.artistRepo.checkIfEntityExists(id);

    return this.artistRepo.update(id, dto);
  }

  async remove(id: string) {
    await this.artistRepo.checkIfEntityExists(id);

    return this.artistRepo.remove(id);
  }
}
