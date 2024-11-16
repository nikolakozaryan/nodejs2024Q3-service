import { IUser } from '@core/interfaces';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
  VersionColumn,
} from 'typeorm';

const transformer: ValueTransformer = {
  to: (val) => val,
  from: (val: Date): number => val.getTime(),
};

@Entity('Users')
export class User implements IUser {
  constructor(login: string, password: string) {
    Object.assign(this, {
      login: login,
      password: password,
    });
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn({
    type: 'timestamp',
    transformer,
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', transformer })
  updatedAt: Date;

  @Exclude()
  @Column()
  password: string;
}
