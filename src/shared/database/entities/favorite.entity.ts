import { IFavorite } from '@core/interfaces';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album } from './album.entity';
import { Artist } from './artist.entity';
import { Track } from './track.entity';

@Entity('Favs')
export class Favorite implements IFavorite {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('uuid', { default: null, nullable: true })
  artistId: string;

  @Column('uuid', { default: null, nullable: true })
  albumId: string;

  @Column('uuid', { default: null, nullable: true })
  trackId: string;

  @OneToOne(() => Artist, { nullable: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  artist: Artist;

  @OneToOne(() => Album, { nullable: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  album: Album;

  @OneToOne(() => Track, { nullable: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  track: Track;
}
