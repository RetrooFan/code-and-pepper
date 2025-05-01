import { Body, Controller, Get, Post } from '@nestjs/common';
import { EpisodesService } from './episodes.service';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  findAll() {
    return this.episodesService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.episodesService.create(body);
  }
}
