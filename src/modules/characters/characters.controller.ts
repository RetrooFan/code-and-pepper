import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { CharactersService } from './characters.service';
import { SaveCharacterDto } from '../../dtos/saveCharacter.dto';
import { UpdateOneCharacterDto } from '../../dtos/updateOneCharacter.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { IdDto } from '../../dtos/id.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  find(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.charactersService.find(paginationQueryDto);
  }

  @Post()
  save(@Body() saveCharacterDto: SaveCharacterDto) {
    return this.charactersService.save(saveCharacterDto);
  }

  @Post(':id/episodes')
  addEpisode(@Param() characterIdDto: IdDto, @Body() episodeIdDto: IdDto) {
    return this.charactersService.addEpisode(characterIdDto.id, episodeIdDto.id);
  }

  @Delete(':id/episodes/:id2')
  deleteEpisode(@Param() idDto: IdDto) {
    return this.charactersService.deleteEpisode(idDto.id, idDto.id2);
  }

  @Post(':id/planet')
  addPlanet(@Param() characterIdDto: IdDto, @Body() planetIdDto: IdDto) {
    return this.charactersService.addPlanet(characterIdDto.id, planetIdDto.id);
  }

  @Delete(':id/planet/:id2')
  deletePlanet(@Param() idDto: IdDto) {
    return this.charactersService.deletePlanet(idDto.id, idDto.id2);
  }

  @Put(':id')
  updateOne(@Param() idDto: IdDto, @Body() updateOneCharacterDto: UpdateOneCharacterDto) {
    return this.charactersService.updateOne(idDto.id, updateOneCharacterDto);
  }

  @Delete(':id')
  deleteOne(@Param() idDto: IdDto) {
    return this.charactersService.deleteOne(idDto.id);
  }
}
