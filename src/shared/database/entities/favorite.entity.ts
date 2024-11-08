import { IFavorite } from '@core/interfaces/favorite.interface';

export class Favorite implements IFavorite {
  artists: string[];
  albums: string[];
  tracks: string[];

  constructor() {
    Object.assign(this, {});
  }
}
