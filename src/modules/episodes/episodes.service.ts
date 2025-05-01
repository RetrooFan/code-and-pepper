import { Injectable } from '@nestjs/common';
import { EpisodeRepository } from '../../repositories/episode.repository';
import { CreateEpisodeDto } from './dtos/createEpisode.dto';
import { ReplaceOneEpisodeDto } from './dtos/replaceOneEpisode.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';

@Injectable()
export class EpisodesService {
  constructor(private readonly episodeRepository: EpisodeRepository) {}

  find(paginationQueryDto: PaginationQueryDto) {
    return this.episodeRepository.find(paginationQueryDto);
  }

  create(createEpisodeDto: CreateEpisodeDto) {
    return this.episodeRepository.create(createEpisodeDto);
  }

  replaceOne(replaceOneEpisodeDto: ReplaceOneEpisodeDto) {
    return this.episodeRepository.replaceOne(replaceOneEpisodeDto);
  }
}
