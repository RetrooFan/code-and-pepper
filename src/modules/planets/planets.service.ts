import { Injectable } from '@nestjs/common';

import { PlanetsRepository } from '../../repositories/planets.repository';
import { CreatePlanetDto } from './dtos/createPlanet.dto';
import { ReplaceOnePlanetDto } from './dtos/replaceOnePlanet.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { DeleteOnePlanetDto } from './dtos/deleteOnePlanet.dto';

@Injectable()
export class PlanetsService {
  constructor(private readonly planetsRepository: PlanetsRepository) {}

  find(paginationQueryDto: PaginationQueryDto) {
    return this.planetsRepository.find(paginationQueryDto);
  }

  create(createPlanetDto: CreatePlanetDto) {
    return this.planetsRepository.create(createPlanetDto);
  }

  replaceOne(replaceOnePlanetDto: ReplaceOnePlanetDto) {
    return this.planetsRepository.replaceOne(replaceOnePlanetDto);
  }

  deleteOne(deleteOnePlanetDto: DeleteOnePlanetDto) {
    return this.planetsRepository.deleteOne(deleteOnePlanetDto);
  }
}
