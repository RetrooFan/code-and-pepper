import { Module } from '@nestjs/common';

import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { EpisodesRepositoryModule } from '../../repositories/episodes.repository.module';
import { CharactersRepositoryModule } from '../../repositories/characters.repository.module';

@Module({
  imports: [EpisodesRepositoryModule, CharactersRepositoryModule],
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class EpisodesModule {}
