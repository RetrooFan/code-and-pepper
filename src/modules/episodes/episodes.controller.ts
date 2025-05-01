import { Body, Controller, Get, Post } from '@nestjs/common';
import { EpisodesService } from './episodes.service';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  private findAll() {
    return this.episodesService.findAll();
  }

  @Post()
  private create(@Body() body) {
    return this.episodesService.create(body);
  }
}
