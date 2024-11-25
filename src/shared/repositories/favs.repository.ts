import { IFav } from '@core/interfaces';
import { FavItemType } from '@core/types';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from '@shared/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FavsRepository {
  constructor(
    @InjectRepository(Favorite)
    private repository: Repository<Favorite>,
  ) {}

  async findAll(): Promise<IFav> {
    const rawData = await this.repository.find();

    return rawData.reduce(
      (acc: IFav, { album, artist, track }) => {
        if (artist) acc.artists.push(artist);
        if (album) acc.albums.push(album);
        if (track) acc.tracks.push(track);

        return acc;
      },
      { artists: [], albums: [], tracks: [] },
    );
  }

  async add(id: string, itemType: FavItemType) {
    const entity = this.repository.create({
      ...(itemType === 'album' ? { albumId: id } : {}),
      ...(itemType === 'artist' ? { artistId: id } : {}),
      ...(itemType === 'track' ? { trackId: id } : {}),
    });

    await this.repository.insert(entity);
  }

  async remove(id: string, itemType: FavItemType) {
    await this.repository.delete({
      ...(itemType === 'album' ? { albumId: id } : {}),
      ...(itemType === 'artist' ? { artistId: id } : {}),
      ...(itemType === 'track' ? { trackId: id } : {}),
    });
  }

  async checkIsFav(id: string, itemType: FavItemType) {
    const isExists = await this.repository.exists({
      where: {
        ...(itemType === 'album' ? { albumId: id } : {}),
        ...(itemType === 'artist' ? { artistId: id } : {}),
        ...(itemType === 'track' ? { trackId: id } : {}),
      },
    });

    if (!isExists) {
      throw new UnprocessableEntityException();
    }
  }
}
