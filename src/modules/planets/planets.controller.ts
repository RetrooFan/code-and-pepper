import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dtos/createPlanet.dto';
import { ReplaceOnePlanetDto } from './dtos/replaceOnePlanet.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { DeleteOnePlanetDto } from './dtos/deleteOnePlanet.dto';

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
  replaceOne(@Body() replaceOnePlanetDto: ReplaceOnePlanetDto) {
    return this.planetsService.replaceOne(replaceOnePlanetDto);
  }

  @Delete(':id')
  deleteOne(@Param() deleteOnePlanetDto: DeleteOnePlanetDto) {
    return this.planetsService.deleteOne(deleteOnePlanetDto);
  }
}
