import { Module } from '@nestjs/common';

import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { PlanetsRepositoryModule } from '../../repositories/planets.repository.module';
import { CharactersRepositoryModule } from '../../repositories/characters.repository.module';

@Module({
  imports: [PlanetsRepositoryModule, CharactersRepositoryModule],
  controllers: [PlanetsController],
  providers: [PlanetsService],
})
export class PlanetsModule {}
