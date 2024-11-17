import { Artist, Album, Track } from '@shared/database/entities';

export interface IFavorite {
  id: number;
  artistId: string;
  albumId: string;
  trackId: string;
}

export interface IFav {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
