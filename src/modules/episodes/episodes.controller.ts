import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';

import { EpisodesService } from './episodes.service';
import { SaveEpisodeDto } from '../../dtos/saveEpisode.dto';
import { UpdateOneEpisodeDto } from '../../dtos/updateOneEpisode.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { IdDto } from '../../dtos/id.dto';
import { IdDto2 } from '../../dtos/id2.dto';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  find(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.episodesService.find(paginationQueryDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  save(@Body() saveEpisodeDto: SaveEpisodeDto) {
    return this.episodesService.save(saveEpisodeDto);
  }

  @Put(':id')
  updateOne(@Param() idDto: IdDto, @Body() updateOneEpisodeDto: UpdateOneEpisodeDto) {
    return this.episodesService.updateOne(idDto.id, updateOneEpisodeDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteOne(@Param() idDto: IdDto) {
    return this.episodesService.deleteOne(idDto.id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':id/characters')
  addCharacter(@Param() episodeIdDto: IdDto, @Body() characterIdDto: IdDto) {
    return this.episodesService.addCharacter(episodeIdDto.id, characterIdDto.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/characters/:id2')
  deleteCharacter(@Param() idDto: IdDto2) {
    return this.episodesService.deleteCharacter(idDto.id, idDto.id2);
  }
}
