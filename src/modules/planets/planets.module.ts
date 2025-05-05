import { Module } from '@nestjs/common';

import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { RepositoryModule } from '../../repositories/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [PlanetsController],
  providers: [PlanetsService],
})
export class PlanetsModule {}
