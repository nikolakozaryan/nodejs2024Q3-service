import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [SharedModule],
})
export class TrackModule {}
