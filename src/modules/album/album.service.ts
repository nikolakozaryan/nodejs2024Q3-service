import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from '@shared/repositories/album.repository';

@Injectable()
export class AlbumService {
  constructor(private albumRepo: AlbumRepository) {}

  async create(dto: CreateAlbumDto) {
    return this.albumRepo.create(dto);
  }

  async findAll() {
    return this.albumRepo.findAll();
  }

  async findOne(id: string) {
    await this.checkIfEntityExists(id);

    return this.albumRepo.findOne(id);
  }

  async update(id: string, dto: UpdateAlbumDto) {
    await this.checkIfEntityExists(id);

    return this.albumRepo.update(id, dto);
  }

  async remove(id: string) {
    await this.checkIfEntityExists(id);

    return this.albumRepo.remove(id);
  }

  private async checkIfEntityExists(albumId: string) {
    await this.albumRepo.checkIfEntityExists(albumId);
  }
}
