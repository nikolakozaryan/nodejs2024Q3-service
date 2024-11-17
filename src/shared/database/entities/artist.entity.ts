import { IArtist } from '@core/interfaces';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from './album.entity';
import { Track } from './track.entity';

@Entity('Artists')
export class Artist implements IArtist {
  constructor(name: string, grammy: boolean) {
    Object.assign(this, {
      name,
      grammy,
    });
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];
}
