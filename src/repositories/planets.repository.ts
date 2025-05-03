import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Planet, PlanetDocument } from '../entities/planet.entity';
import { PaginationQueryDto } from '../dtos/pagination.query.dto';
import { Character, CharacterDocument } from '../entities/character.entity';
import { RepositoryAbstract } from './repository.abstract';

@Injectable()
export class PlanetsRepository extends RepositoryAbstract<Planet> {
  constructor(
    @InjectModel(Planet.name, PlanetsRepository.name)
    protected readonly modelAbstract: Model<PlanetDocument>,
    @InjectModel(Character.name, PlanetsRepository.name)
    private readonly characterModel: Model<CharacterDocument>,
  ) {
    super();
  }

  find(paginationQueryDto: PaginationQueryDto) {
    const query = super.find(paginationQueryDto);

    if (paginationQueryDto.populate) {
      return query.populate({ path: 'characters', model: this.characterModel });
    }

    return query;
  }
}
