import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from '@shared/repositories/album.repository';
import { Album } from '@shared/database/entities';
import { FavsRepository } from '@shared/repositories/favs.repository';
import { TrackRepository } from '@shared/repositories/track.repository';

@Injectable()
export class AlbumService {
  constructor(
    private albumRepo: AlbumRepository,
    private favsRepo: FavsRepository,
    private trackRepo: TrackRepository,
  ) {}

  create(dto: CreateAlbumDto) {
    const { artistId, name, year } = dto;

    const entity = new Album(name, year, artistId);

    return this.albumRepo.create(entity);
  }

  findAll() {
    return this.albumRepo.findAll();
  }

  findOne(id: string) {
    this.checkIfAlbumExists(id);

    return this.albumRepo.findOne(id);
  }

  update(id: string, dto: UpdateAlbumDto) {
    this.checkIfAlbumExists(id);

    return this.albumRepo.update(id, dto);
  }

  remove(id: string) {
    this.checkIfAlbumExists(id);

    this.favsRepo.removeAlbum(id);

    this.trackRepo.removeAlbum(id);

    return this.albumRepo.remove(id);
  }

  private checkIfAlbumExists(albumId: string) {
    this.albumRepo.checkIfAlbumExists(albumId);
  }
}
