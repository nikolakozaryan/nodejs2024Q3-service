import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@shared/database/entities';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async findOne(where: FindOptionsWhere<User>): Promise<User> {
    return this.repository.findOneBy(where);
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async create(dto: CreateUserDto): Promise<User> {
    const password = await bcrypt.hash(dto.password, +process.env.CRYPT_SALT);

    const entity = this.repository.create({ ...dto, password });

    await this.repository.insert(entity);

    return this.findOne({ id: entity.id });
  }

  async update(id: string, password: string): Promise<User> {
    await this.repository.update(id, { password });

    return this.findOne({ id });
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async checkIfEntityExists(
    options: FindManyOptions<User>,
    checkForFav = false,
  ): Promise<void> {
    const isExists = await this.repository.exists(options);

    if (!isExists) {
      throw checkForFav
        ? new UnprocessableEntityException()
        : new NotFoundException();
    }
  }
}
