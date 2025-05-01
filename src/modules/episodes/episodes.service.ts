import { Injectable } from '@nestjs/common';
import { EpisodeRepository } from '../../repositories/episode.repository';
import { CreateEpisodeDto } from './dtos/createEpisode.dto';

@Injectable()
export class EpisodesService {
  constructor(private readonly episodeRepository: EpisodeRepository) {}

  find() {
    return this.episodeRepository.find();
  }

  create(createEpisodeDto: CreateEpisodeDto) {
    return this.episodeRepository.create(createEpisodeDto);
  }
}
