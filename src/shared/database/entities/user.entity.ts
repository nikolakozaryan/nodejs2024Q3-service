import { IUser } from '@core/interfaces';
import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class User implements IUser {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(login: string, password: string) {
    Object.assign(this, {
      id: randomUUID(),
      login: login,
      password: password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  }
}
