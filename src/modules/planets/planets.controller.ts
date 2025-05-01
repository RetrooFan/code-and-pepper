import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dtos/createPlanet.dto';
import { UpdateOnePlanetDto } from './dtos/updateOnePlanet.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { IdDto } from '../../dtos/id.dto';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  find(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.planetsService.find(paginationQueryDto);
  }

  @Post()
  create(@Body() createPlanetDto: CreatePlanetDto) {
    return this.planetsService.create(createPlanetDto);
  }

  @Put()
  updateOne(@Param() idDto: IdDto, @Body() updateOnePlanetDto: UpdateOnePlanetDto) {
    return this.planetsService.updateOne(idDto, updateOnePlanetDto);
  }

  @Delete(':id')
  deleteOne(@Param() idDto: IdDto) {
    return this.planetsService.deleteOne(idDto);
  }
}
