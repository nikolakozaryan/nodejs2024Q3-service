import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [SharedModule],
})
export class AlbumsModule {}
