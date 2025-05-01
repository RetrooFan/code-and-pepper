import { Injectable } from '@nestjs/common';
import { EpisodeRepository } from '../../repositories/episode.repository';
import { CreateEpisodeDto } from './dtos/createEpisode.dto';
import { ReplaceEpisodeDto } from './dtos/replaceEpisode.dto';

@Injectable()
export class EpisodesService {
  constructor(private readonly episodeRepository: EpisodeRepository) {}

  find() {
    return this.episodeRepository.find();
  }

  create(createEpisodeDto: CreateEpisodeDto) {
    return this.episodeRepository.create(createEpisodeDto);
  }

  replaceOne(replaceEpisodeDto: ReplaceEpisodeDto) {
    return this.episodeRepository.replaceOne(replaceEpisodeDto);
  }
}
