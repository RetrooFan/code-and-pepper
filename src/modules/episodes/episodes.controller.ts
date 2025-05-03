import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from '../../dtos/createEpisode.dto';
import { UpdateOneEpisodeDto } from '../../dtos/updateOneEpisode.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { IdDto } from '../../dtos/id.dto';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  find(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.episodesService.find(paginationQueryDto);
  }

  @Post()
  save(@Body() createEpisodeDto: CreateEpisodeDto) {
    return this.episodesService.save(createEpisodeDto);
  }

  @Put(':id')
  updateOne(@Param() idDto: IdDto, @Body() updateOneEpisodeDto: UpdateOneEpisodeDto) {
    return this.episodesService.updateOne(idDto, updateOneEpisodeDto);
  }

  @Delete(':id')
  deleteOne(@Param() idDto: IdDto) {
    return this.episodesService.deleteOne(idDto);
  }
}
