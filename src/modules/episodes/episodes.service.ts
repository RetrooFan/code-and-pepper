import { HttpException, Injectable } from '@nestjs/common';

import { EpisodesRepository } from '../../repositories/episodes.repository';
import { SaveEpisodeDto } from '../../dtos/saveEpisode.dto';
import { UpdateOneEpisodeDto } from '../../dtos/updateOneEpisode.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { IdDto } from '../../dtos/id.dto';
import { CharactersRepository } from '../../repositories/characters.repository';

@Injectable()
export class EpisodesService {
  constructor(
    private readonly episodesRepository: EpisodesRepository,
    private readonly charactersRepository: CharactersRepository,
  ) {}

  find(paginationQueryDto: PaginationQueryDto) {
    return this.episodesRepository.find(paginationQueryDto);
  }

  save(saveEpisodeDto: SaveEpisodeDto) {
    return this.episodesRepository.save(saveEpisodeDto);
  }

  async addCharacter(episodeIdDto: IdDto, characterIdDto: IdDto) {
    const episode = await this.episodesRepository.findById(episodeIdDto.id);
    if (!episode) {
      throw new HttpException('No such an episode.', 400);
    }

    const character = await this.charactersRepository.findById(characterIdDto.id);
    if (!character) {
      throw new HttpException('No such a character.', 400);
    }

    episode.characters.push(character);
    character.episodes.push(episode);

    await this.episodesRepository.updateOne(episode._id.toString(), episode);
    await this.charactersRepository.updateOne(character._id.toString(), character);

    return episode;
  }

  updateOne(idDto: IdDto, updateOneEpisodeDto: UpdateOneEpisodeDto) {
    return this.episodesRepository.updateOne(idDto.id, updateOneEpisodeDto);
  }

  deleteOne(idDto: IdDto) {
    return this.episodesRepository.deleteOne(idDto.id);
  }
}
