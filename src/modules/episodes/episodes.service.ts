import { Injectable } from '@nestjs/common';
import { EpisodeRepository } from '../../repositories/episode.repository';
import { CreateEpisodeDto } from './dtos/createEpisode.dto';
import { ReplaceEpisodeDto } from './dtos/replaceEpisode.dto';
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

  replaceOne(replaceEpisodeDto: ReplaceEpisodeDto) {
    return this.episodeRepository.replaceOne(replaceEpisodeDto);
  }
}
