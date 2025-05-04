import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';

import { CharactersService } from './characters.service';
import { SaveCharacterDto } from '../../dtos/saveCharacter.dto';
import { UpdateOneCharacterDto } from '../../dtos/updateOneCharacter.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { IdDto } from '../../dtos/id.dto';
import { IdDto2 } from '../../dtos/id2.dto';
import { ApiConflictResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  find(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.charactersService.find(paginationQueryDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  save(@Body() saveCharacterDto: SaveCharacterDto) {
    return this.charactersService.save(saveCharacterDto);
  }

  @Put(':id')
  updateOne(@Param() idDto: IdDto, @Body() updateOneCharacterDto: UpdateOneCharacterDto) {
    return this.charactersService.updateOne(idDto.id, updateOneCharacterDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @ApiConflictResponse()
  @Delete(':id')
  deleteOne(@Param() idDto: IdDto) {
    return this.charactersService.deleteOne(idDto.id);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @ApiConflictResponse()
  @Post(':id/episodes')
  addEpisode(@Param() characterIdDto: IdDto, @Body() episodeIdDto: IdDto) {
    return this.charactersService.addEpisode(characterIdDto.id, episodeIdDto.id);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @ApiConflictResponse()
  @Post(':id/planet')
  addPlanet(@Param() characterIdDto: IdDto, @Body() planetIdDto: IdDto) {
    return this.charactersService.addPlanet(characterIdDto.id, planetIdDto.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @Delete(':id/episodes/:id2')
  deleteEpisode(@Param() idDto: IdDto2) {
    return this.charactersService.deleteEpisode(idDto.id, idDto.id2);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @Delete(':id/planet/:id2')
  deletePlanet(@Param() idDto: IdDto2) {
    return this.charactersService.deletePlanet(idDto.id, idDto.id2);
  }
}
