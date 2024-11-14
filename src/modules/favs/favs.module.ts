import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [SharedModule],
})
export class FavsModule {}
