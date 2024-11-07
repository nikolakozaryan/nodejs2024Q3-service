import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [SharedModule],
})
export class TracksModule {}
