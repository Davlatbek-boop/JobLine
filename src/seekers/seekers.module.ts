import { Module } from '@nestjs/common';
import { SeekersService } from './seekers.service';
import { SeekersController } from './seekers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seeker } from './entities/seeker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seeker])],
  controllers: [SeekersController],
  providers: [SeekersService],
  exports:[SeekersService]
})
export class SeekersModule {}
