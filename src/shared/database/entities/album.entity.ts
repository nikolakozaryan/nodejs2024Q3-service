import { IAlbum } from '@core/interfaces';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from './artist.entity';
import { Track } from './track.entity';

@Entity('Albums')
export class Album implements IAlbum {
  constructor(name: string, year: number, artistId: string) {
    Object.assign(this, { name, year, artistId });
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column('uuid', { default: null, nullable: true })
  artistId: string;

  @ManyToOne(() => Artist, (artist) => artist.albums, { onDelete: 'SET NULL' })
  artist: Artist;

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];
}
