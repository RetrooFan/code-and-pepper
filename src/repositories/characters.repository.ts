import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';

import { Character, CharacterDocument } from '../entities/character.entity';
import { PaginationQueryDto } from '../dtos/pagination.query.dto';
import { Episode, EpisodeDocument } from '../entities/episode.entity';
import { Planet, PlanetDocument } from '../entities/planet.entity';
import { RepositoryAbstract } from './repository.abstract';

@Injectable()
export class CharactersRepository extends RepositoryAbstract<Character, CharacterDocument> {
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

  async deleteOne(_id: string, session?: ClientSession) {
    const character = await this.findById(_id);

    if (!character) {
      throw new HttpException('No such a character.', 400);
    }

    if (character.episodes.length) {
      throw new HttpException('Character has assigned episodes.', 400);
    }

    if (character.planet) {
      throw new HttpException('Character has assigned planet.', 400);
    }

    return super.deleteOne(_id, session);
  }
}
