import { Module } from '@nestjs/common';

import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { PlanetsRepositoryModule } from '../../repositories/planets/planetsRepository.module';

@Module({
  imports: [PlanetsRepositoryModule],
  controllers: [PlanetsController],
  providers: [PlanetsService],
})
export class PlanetsModule {}
