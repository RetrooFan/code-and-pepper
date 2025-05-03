import { Module } from '@nestjs/common';

import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { CharactersRepositoryModule } from '../../repositories/characters.repository.module';
import { EpisodesRepositoryModule } from '../../repositories/episodes.repository.module';
import { PlanetsRepositoryModule } from '../../repositories/planets.repository.module';

@Module({
  imports: [CharactersRepositoryModule, EpisodesRepositoryModule, PlanetsRepositoryModule],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
