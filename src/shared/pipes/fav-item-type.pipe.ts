import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FavItemTypePipe implements PipeTransform {
  transform(value: string) {
    const acceptableValues = ['album', 'artist', 'track'];

    if (!acceptableValues.includes(value)) {
      throw new NotFoundException();
    }

    return value;
  }
}
