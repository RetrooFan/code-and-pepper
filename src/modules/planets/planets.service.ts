import { Injectable } from '@nestjs/common';

import { PlanetsRepository } from '../../repositories/planets.repository';
import { CreatePlanetDto } from '../../dtos/createPlanet.dto';
import { UpdateOnePlanetDto } from '../../dtos/updateOnePlanet.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { IdDto } from '../../dtos/id.dto';

@Injectable()
export class PlanetsService {
  constructor(private readonly planetsRepository: PlanetsRepository) {}

  find(paginationQueryDto: PaginationQueryDto) {
    return this.planetsRepository.find(paginationQueryDto);
  }

  create(createPlanetDto: CreatePlanetDto) {
    return this.planetsRepository.create(createPlanetDto);
  }

  updateOne(idDto: IdDto, updateOnePlanetDto: UpdateOnePlanetDto) {
    return this.planetsRepository.updateOne(idDto, updateOnePlanetDto);
  }

  deleteOne(idDto: IdDto) {
    return this.planetsRepository.deleteOne(idDto);
  }
}
