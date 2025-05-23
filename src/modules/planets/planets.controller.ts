import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { PlanetsService } from './planets.service';
import { SavePlanetDto } from '../../dtos/savePlanet.dto';
import { UpdateOnePlanetDto } from '../../dtos/updateOnePlanet.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { IdDto } from '../../dtos/id.dto';
import { IdDto2 } from '../../dtos/id2.dto';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  find(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.planetsService.find(paginationQueryDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @Post()
  save(@Body() savePlanetDto: SavePlanetDto) {
    return this.planetsService.save(savePlanetDto);
  }

  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Put(':id')
  updateOne(@Param() idDto: IdDto, @Body() updateOnePlanetDto: UpdateOnePlanetDto) {
    return this.planetsService.updateOne(idDto.id, updateOnePlanetDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @ApiConflictResponse()
  @Delete(':id')
  deleteOne(@Param() idDto: IdDto) {
    return this.planetsService.deleteOne(idDto.id);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @ApiConflictResponse()
  @Post(':id/characters')
  addCharacter(@Param() planetIdDto: IdDto, @Body() characterIdDto: IdDto) {
    return this.planetsService.addCharacter(planetIdDto.id, characterIdDto.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @Delete(':id/characters/:id2')
  deleteCharacter(@Param() idDto: IdDto2) {
    return this.planetsService.deleteCharacter(idDto.id, idDto.id2);
  }
}
