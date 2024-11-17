import { CreateArtistDto } from '@modules/artist/dto/create-artist.dto';
import { UpdateArtistDto } from '@modules/artist/dto/update-artist.dto';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '@shared/database/entities';
import { In, Repository } from 'typeorm';

@Injectable()
export class ArtistRepository {
  constructor(
    @InjectRepository(Artist)
    private repository: Repository<Artist>,
  ) {}

  async findOne(id: string): Promise<Artist> {
    return this.repository.findOneBy({ id });
  }

  async findAll(): Promise<Artist[]> {
    return this.repository.find();
  }

  async findMany(ids: string[]): Promise<Artist[]> {
    return this.repository.findBy({ id: In(ids) });
  }

  async create(dto: CreateArtistDto): Promise<Artist> {
    const entity = await this.repository.create(dto);

    await this.repository.insert(entity);

    return this.findOne(entity.id);
  }

  async update(id: string, dto: UpdateArtistDto): Promise<Artist> {
    await this.repository.update(id, dto);

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async checkIfEntityExists(id: string, checkForFav = false): Promise<void> {
    const isExists = await this.repository.exists({
      where: { id },
    });

    if (!isExists) {
      const err = checkForFav
        ? new UnprocessableEntityException()
        : new NotFoundException();

      throw err;
    }
  }
}
