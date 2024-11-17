import { CreateAlbumDto } from '@modules/album/dto/create-album.dto';
import { UpdateAlbumDto } from '@modules/album/dto/update-album.dto';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from '@shared/database/entities';
import { In, Repository } from 'typeorm';

@Injectable()
export class AlbumRepository {
  constructor(
    @InjectRepository(Album)
    private repository: Repository<Album>,
  ) {}

  async findOne(id: string): Promise<Album> {
    return this.repository.findOneBy({ id });
  }

  async findAll(): Promise<Album[]> {
    return this.repository.find();
  }

  async findMany(ids: string[]): Promise<Album[]> {
    return this.repository.findBy({ id: In(ids) });
  }

  async create(dto: CreateAlbumDto): Promise<Album> {
    const entity = await this.repository.create(dto);

    await this.repository.insert(entity);

    return this.findOne(entity.id);
  }

  async update(id: string, dto: UpdateAlbumDto): Promise<Album> {
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
