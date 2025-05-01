import { Injectable } from '@nestjs/common';

import { EpisodesRepository } from '../../repositories/episodes.repository';
import { CreateEpisodeDto } from './dtos/createEpisode.dto';
import { UpdateOneEpisodeDto } from './dtos/updateOneEpisode.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { IdDto } from '../../dtos/id.dto';

@Injectable()
export class EpisodesService {
  constructor(private readonly episodesRepository: EpisodesRepository) {}

  find(paginationQueryDto: PaginationQueryDto) {
    return this.episodesRepository.find(paginationQueryDto);
  }

  create(createEpisodeDto: CreateEpisodeDto) {
    return this.episodesRepository.create(createEpisodeDto);
  }

  updateOne(idDto: IdDto, updateOneEpisodeDto: UpdateOneEpisodeDto) {
    return this.episodesRepository.updateOne(idDto, updateOneEpisodeDto);
  }

  deleteOne(idDto: IdDto) {
    return this.episodesRepository.deleteOne(idDto);
  }
}
