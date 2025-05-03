import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';

import { Episode, EpisodeDocument } from '../entities/episode.entity';
import { PaginationQueryDto } from '../dtos/pagination.query.dto';
import { Character, CharacterDocument } from '../entities/character.entity';
import { RepositoryAbstract } from './repository.abstract';

@Injectable()
export class EpisodesRepository extends RepositoryAbstract<Episode, EpisodeDocument> {
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

  async deleteOne(_id: string, session?: ClientSession) {
    const episode = await this.findById(_id);

    if (!episode) {
      throw new HttpException('No such an episode.', 400);
    }

    if (episode.characters.length) {
      throw new HttpException('Episode has assigned characters.', 400);
    }

    return super.deleteOne(_id, session);
  }
}
