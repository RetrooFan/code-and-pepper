import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Episode, EpisodeDocument } from '../entities/episode.entity';
import { PaginationQueryDto } from '../dtos/pagination.query.dto';
import { Character, CharacterDocument } from '../entities/character.entity';
import { RepositoryAbstract } from './repository.abstract';

@Injectable()
export class EpisodesRepository extends RepositoryAbstract<Episode> {
  constructor(
    @InjectModel(Episode.name, EpisodesRepository.name)
    protected readonly modelAbstract: Model<EpisodeDocument>,
    @InjectModel(Character.name, EpisodesRepository.name)
    private readonly characterModel: Model<CharacterDocument>,
  ) {
    super();
  }

  find(paginationQueryDto: PaginationQueryDto) {
    const query = super.find(paginationQueryDto);

    if (paginationQueryDto.populate) {
      return query.populate({ path: 'characters', model: this.characterModel });
    }

    return query;
  }
}
