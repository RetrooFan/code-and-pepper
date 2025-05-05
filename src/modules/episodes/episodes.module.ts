import { Module } from '@nestjs/common';

import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { RepositoryModule } from '../../repositories/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class EpisodesModule {}
