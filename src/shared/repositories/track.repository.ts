import { CreateTrackDto } from '@modules/track/dto/create-track.dto';
import { UpdateTrackDto } from '@modules/track/dto/update-track.dto';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from '@shared/database/entities';
import { Repository, In } from 'typeorm';

@Injectable()
export class TrackRepository {
  constructor(
    @InjectRepository(Track)
    private repository: Repository<Track>,
  ) {}

  async findOne(id: string): Promise<Track> {
    return this.repository.findOneBy({ id });
  }

  async findAll(): Promise<Track[]> {
    return this.repository.find();
  }

  async findMany(ids: string[]): Promise<Track[]> {
    return this.repository.findBy({ id: In(ids) });
  }

  async create(dto: CreateTrackDto): Promise<Track> {
    const entity = await this.repository.create(dto);

    await this.repository.insert(entity);

    return this.findOne(entity.id);
  }

  async update(id: string, dto: UpdateTrackDto): Promise<Track> {
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
