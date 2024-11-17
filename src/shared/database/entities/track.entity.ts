import { ITrack } from '@core/interfaces';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from './artist.entity';
import { Album } from './album.entity';

@Entity('Tracks')
export class Track implements ITrack {
  constructor(
    name: string,
    artistId: string,
    albumId: string,
    duration: number,
  ) {
    Object.assign(this, {
      name,
      artistId,
      albumId,
      duration,
    });
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column('uuid', { default: null, nullable: true })
  artistId: string;

  @Column('uuid', { default: null, nullable: true })
  albumId: string;

  @ManyToOne(() => Artist, (artist) => artist.tracks, { onDelete: 'SET NULL' })
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.tracks, { onDelete: 'SET NULL' })
  album: Album;
}
