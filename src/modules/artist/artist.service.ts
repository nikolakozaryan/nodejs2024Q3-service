import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from '@shared/repositories/artist.repository';
import { Artist } from '@shared/database/entities';
import { FavsRepository } from '@shared/repositories/favs.repository';
import { AlbumRepository } from '@shared/repositories/album.repository';
import { TrackRepository } from '@shared/repositories/track.repository';

@Injectable()
export class ArtistService {
  constructor(
    private artistRepo: ArtistRepository,
    private favsRepo: FavsRepository,
    private albumRepo: AlbumRepository,
    private trackRepo: TrackRepository,
  ) {}

  create(dto: CreateArtistDto) {
    const { grammy, name } = dto;

    const entity = new Artist(name, grammy);

    return this.artistRepo.create(entity);
  }

  findAll() {
    return this.artistRepo.findAll();
  }

  findOne(id: string) {
    this.artistRepo.checkIfArtistExists(id);

    return this.artistRepo.findOne(id);
  }

  update(id: string, dto: UpdateArtistDto) {
    this.artistRepo.checkIfArtistExists(id);

    return this.artistRepo.update(id, dto);
  }

  remove(id: string) {
    this.artistRepo.checkIfArtistExists(id);

    this.favsRepo.removeArtist(id);

    this.albumRepo.removeArtist(id);

    this.trackRepo.removeArtist(id);

    return this.artistRepo.remove(id);
  }
}
