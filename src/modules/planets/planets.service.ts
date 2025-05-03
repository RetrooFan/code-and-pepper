import { Injectable } from '@nestjs/common';

import { PlanetsRepository } from '../../repositories/planets.repository';
import { SavePlanetDto } from '../../dtos/savePlanet.dto';
import { UpdateOnePlanetDto } from '../../dtos/updateOnePlanet.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { IdDto } from '../../dtos/id.dto';

@Injectable()
export class PlanetsService {
  constructor(private readonly planetsRepository: PlanetsRepository) {}

  find(paginationQueryDto: PaginationQueryDto) {
    return this.planetsRepository.find(paginationQueryDto);
  }

  save(savePlanetDto: SavePlanetDto) {
    return this.planetsRepository.save(savePlanetDto);
  }

  updateOne(idDto: IdDto, updateOnePlanetDto: UpdateOnePlanetDto) {
    return this.planetsRepository.updateOne(idDto, updateOnePlanetDto);
  }

  deleteOne(idDto: IdDto) {
    return this.planetsRepository.deleteOne(idDto);
  }
}
