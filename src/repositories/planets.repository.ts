import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Planet } from '../entities/planet.entity';
import { DbConnection } from '../enums/dbConnection.enum';
import { CreatePlanetDto } from '../modules/planets/dtos/createPlanet.dto';
import { UpdateOnePlanetDto } from '../modules/planets/dtos/updateOnePlanet.dto';
import { PaginationQueryDto } from '../dtos/pagination.query.dto';
import { IdDto } from '../dtos/id.dto';

@Injectable()
export class PlanetsRepository {
  constructor(
    @InjectModel(Planet.name, DbConnection.PLANETS)
    private readonly planetModel: Model<Planet>,
  ) {}

  find(paginationQueryDto: PaginationQueryDto) {
    return this.planetModel
      .find<Planet>()
      .sort({ createdAt: 1 })
      .skip(paginationQueryDto.offset)
      .limit(paginationQueryDto.limit);
  }

  create(createPlanetDto: CreatePlanetDto) {
    return this.planetModel.create(createPlanetDto);
  }

  updateOne(idDto: IdDto, updateOnePlanetDto: UpdateOnePlanetDto) {
    return this.planetModel.updateOne({ _id: idDto.id }, updateOnePlanetDto);
  }

  deleteOne(idDto: IdDto) {
    return this.planetModel.deleteOne({ _id: idDto.id });
  }
}
