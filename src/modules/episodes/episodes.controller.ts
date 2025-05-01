import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dtos/createEpisode.dto';
import { ReplaceEpisodeDto } from './dtos/replaceEpisode.dto';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  find() {
    return this.episodesService.find();
  }

  @Post()
  create(@Body() createEpisodeDto: CreateEpisodeDto) {
    return this.episodesService.create(createEpisodeDto);
  }

  @Put()
  replaceOne(@Body() replaceEpisodeDto: ReplaceEpisodeDto) {
    return this.episodesService.replaceOne(replaceEpisodeDto);
  }
}
