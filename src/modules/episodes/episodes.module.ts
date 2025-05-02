import { Module } from '@nestjs/common';

import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { EpisodesRepositoryModule } from '../../repositories/episodes/episodesRepository.module';

@Module({
  imports: [EpisodesRepositoryModule],
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class EpisodesModule {}
