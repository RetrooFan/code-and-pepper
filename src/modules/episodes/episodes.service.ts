import { Injectable } from '@nestjs/common';

import { EpisodesRepository } from '../../repositories/episodes.repository';
import { CreateEpisodeDto } from './dtos/createEpisode.dto';
import { ReplaceOneEpisodeDto } from './dtos/replaceOneEpisode.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { DeleteOneEpisodeDto } from './dtos/deleteOneEpisode.dto';

@Injectable()
export class EpisodesService {
  constructor(private readonly episodesRepository: EpisodesRepository) {}

  find(paginationQueryDto: PaginationQueryDto) {
    return this.episodesRepository.find(paginationQueryDto);
  }

  create(createEpisodeDto: CreateEpisodeDto) {
    return this.episodesRepository.create(createEpisodeDto);
  }

  replaceOne(replaceOneEpisodeDto: ReplaceOneEpisodeDto) {
    return this.episodesRepository.replaceOne(replaceOneEpisodeDto);
  }

  deleteOne(deleteOneEpisodeDto: DeleteOneEpisodeDto) {
    return this.episodesRepository.deleteOne(deleteOneEpisodeDto);
  }
}
