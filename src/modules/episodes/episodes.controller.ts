import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dtos/createEpisode.dto';
import { ReplaceOneEpisodeDto } from './dtos/replaceOneEpisode.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  find(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.episodesService.find(paginationQueryDto);
  }

  @Post()
  create(@Body() createEpisodeDto: CreateEpisodeDto) {
    return this.episodesService.create(createEpisodeDto);
  }

  @Put()
  replaceOne(@Body() replaceOneEpisodeDto: ReplaceOneEpisodeDto) {
    return this.episodesService.replaceOne(replaceOneEpisodeDto);
  }
}
