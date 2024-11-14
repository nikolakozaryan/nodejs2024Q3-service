import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@shared/database/entities';

@Injectable()
export class UserRepository {
  private _users: Map<string, User> = new Map();

  findOne(userId: string): User {
    return this._users.get(userId);
  }

  findAll(): User[] {
    return [...this._users.values()];
  }

  create(entity: User): User {
    this._users.set(entity.id, entity);

    return entity;
  }

  update(userId: string, password: string): User {
    const user = this.findOne(userId);

    this._users.set(
      userId,
      Object.assign(user, {
        password,
        version: user.version + 1,
        updatedAt: Date.now(),
      }),
    );

    return this._users.get(userId);
  }

  remove(userId: string): void {
    this._users.delete(userId);
  }

  checkIfUserExists(userId: string) {
    if (!this._users.has(userId)) {
      throw new NotFoundException();
    }
  }
}
