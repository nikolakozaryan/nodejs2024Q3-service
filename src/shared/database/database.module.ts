import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sourceConfig } from 'datasource';

@Module({
  imports: [TypeOrmModule.forRoot(sourceConfig)],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
