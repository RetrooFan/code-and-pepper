import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';

import { Planet, PlanetDocument } from '../entities/planet.entity';
import { PaginationQueryDto } from '../dtos/pagination.query.dto';
import { Character, CharacterDocument } from '../entities/character.entity';
import { RepositoryAbstract } from './repository.abstract';

@Injectable()
export class PlanetsRepository extends RepositoryAbstract<Planet, PlanetDocument> {
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

  async deleteOne(_id: string, session?: ClientSession) {
    const planet = await this.findById(_id);

    if (!planet) {
      throw new HttpException('No such a planet.', 404);
    }

    if (planet.characters.length) {
      throw new HttpException('Planet has assigned characters.', 409);
    }

    return super.deleteOne(_id, session);
  }
}
