import { HttpException, Injectable } from '@nestjs/common';

import { EpisodesRepository } from '../../repositories/episodes.repository';
import { SaveEpisodeDto } from '../../dtos/saveEpisode.dto';
import { UpdateOneEpisodeDto } from '../../dtos/updateOneEpisode.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
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

  async addCharacter(episodeId: string, characterId: string) {
    const episode = await this.episodesRepository.findById(episodeId);
    if (!episode) {
      throw new HttpException('No such an episode.', 400);
    }

    const character = await this.charactersRepository.findById(characterId);
    if (!character) {
      throw new HttpException('No such a character.', 400);
    }

    if (episode.characters.find((element) => element._id.equals(character._id))) {
      throw new HttpException('Character already added for this episode.', 400);
    }

    if (character.episodes.find((element) => element._id.equals(episode._id))) {
      throw new HttpException('Episode already added for this character.', 400);
    }

    episode.characters.push(character);
    character.episodes.push(episode);

    await this.episodesRepository.updateOne(episode._id.toString(), episode);
    await this.charactersRepository.updateOne(character._id.toString(), character);

    return episode;
  }

  updateOne(episodeId: string, updateOneEpisodeDto: UpdateOneEpisodeDto) {
    return this.episodesRepository.updateOne(episodeId, updateOneEpisodeDto);
  }

  deleteOne(episodeId: string) {
    return this.episodesRepository.deleteOne(episodeId);
  }
}
