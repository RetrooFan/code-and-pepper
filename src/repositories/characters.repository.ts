import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Character, CharacterDocument } from '../entities/character.entity';
import { PaginationQueryDto } from '../dtos/pagination.query.dto';
import { Episode, EpisodeDocument } from '../entities/episode.entity';
import { Planet, PlanetDocument } from '../entities/planet.entity';
import { RepositoryAbstract } from './repository.abstract';

@Injectable()
export class CharactersRepository extends RepositoryAbstract<Character> {
  constructor(
    @InjectModel(Character.name, CharactersRepository.name)
    protected readonly modelAbstract: Model<CharacterDocument>,
    @InjectModel(Episode.name, CharactersRepository.name)
    private readonly episodeModel: Model<EpisodeDocument>,
    @InjectModel(Planet.name, CharactersRepository.name)
    private readonly planetModel: Model<PlanetDocument>,
  ) {
    super();
  }

  find(paginationQueryDto: PaginationQueryDto) {
    const query = super.find(paginationQueryDto);

    if (paginationQueryDto.populate) {
      return query
        .populate({ path: 'episodes', model: this.episodeModel })
        .populate({ path: 'planet', model: this.planetModel });
    }

    return query;
  }
}
