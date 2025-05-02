import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';

import { Planet, PlanetDocument } from '../../entities/planet.entity';
import { CreatePlanetDto } from '../../dtos/createPlanet.dto';
import { UpdateOnePlanetDto } from '../../dtos/updateOnePlanet.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { IdDto } from '../../dtos/id.dto';
import { Character, CharacterDocument } from '../../entities/character.entity';

@Injectable()
export class PlanetsRepository {
  constructor(
    @InjectModel(Planet.name, PlanetsRepository.name)
    private readonly planetModel: Model<PlanetDocument>,
    @InjectModel(Character.name, PlanetsRepository.name)
    private readonly characterModel: Model<CharacterDocument>,
  ) {}

  find(paginationQueryDto: PaginationQueryDto) {
    return this.planetModel
      .find<Planet>()
      .sort({ createdAt: 1 })
      .skip(paginationQueryDto.offset)
      .limit(paginationQueryDto.limit)
      .populate({ path: 'characters', model: this.characterModel });
  }

  create(createPlanetDto: CreatePlanetDto, session?: ClientSession) {
    return new this.planetModel(createPlanetDto).save({ session });
  }

  updateOne(idDto: IdDto, updateOnePlanetDto: UpdateOnePlanetDto, session?: ClientSession) {
    return this.planetModel.updateOne({ _id: idDto.id }, updateOnePlanetDto, { session });
  }

  deleteOne(idDto: IdDto, session?: ClientSession) {
    return this.planetModel.deleteOne({ _id: idDto.id }, { session });
  }
}
