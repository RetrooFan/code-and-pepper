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
    return this.charactersService.addEpisode(characterIdDto, episodeIdDto);
  }

  @Put(':id')
  updateOne(@Param() idDto: IdDto, @Body() updateOneCharacterDto: UpdateOneCharacterDto) {
    return this.charactersService.updateOne(idDto, updateOneCharacterDto);
  }

  @Delete(':id')
  deleteOne(@Param() idDto: IdDto) {
    return this.charactersService.deleteOne(idDto);
  }
}
