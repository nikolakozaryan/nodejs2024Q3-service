import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@shared/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    return this.repository.findOneBy({ id });
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async create(dto: CreateUserDto): Promise<User> {
    const entity = await this.repository.create(dto);

    await this.repository.insert(entity);

    return this.findOne(entity.id);
  }

  async update(id: string, password: string): Promise<User> {
    await this.repository.update(id, { password });

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
