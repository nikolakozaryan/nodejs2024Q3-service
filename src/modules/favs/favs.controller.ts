import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpStatus,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavItemType, FavsService } from './favs.service';
import { FavItemTypePipe } from '@shared/pipes/fav-item-type.pipe';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getFavs() {
    return this.favsService.getFavs();
  }

  @Post(':itemType/:id')
  add(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Param('itemType', new FavItemTypePipe())
    itemType: FavItemType,
  ) {
    return this.favsService.addItem(id, itemType);
  }

  @Delete(':itemType/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Param('itemType', new FavItemTypePipe())
    itemType: FavItemType,
  ) {
    return this.favsService.removeItem(id, itemType);
  }
}
