import { HttpException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { EpisodesRepository } from '../../repositories/episodes.repository';
import { SaveEpisodeDto } from '../../dtos/saveEpisode.dto';
import { UpdateOneEpisodeDto } from '../../dtos/updateOneEpisode.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { CharactersRepository } from '../../repositories/characters.repository';
import { transaction } from '../../utils/transaction';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private readonly episodesRepository: EpisodesRepository,
    private readonly charactersRepository: CharactersRepository,
  ) {}

  find(paginationQueryDto: PaginationQueryDto) {
    return this.episodesRepository.find(paginationQueryDto);
  }

  save(saveEpisodeDto: SaveEpisodeDto) {
    return this.episodesRepository.save(saveEpisodeDto);
  }

  updateOne(episodeId: string, updateOneEpisodeDto: UpdateOneEpisodeDto) {
    return this.episodesRepository.updateOne(episodeId, updateOneEpisodeDto);
  }

  deleteOne(episodeId: string) {
    return this.episodesRepository.deleteOne(episodeId);
  }

  async addCharacter(episodeId: string, characterId: string) {
    const episode = await this.episodesRepository.findById(episodeId);
    if (!episode) {
      throw new HttpException('No such an episode.', 404);
    }

    const character = await this.charactersRepository.findById(characterId);
    if (!character) {
      throw new HttpException('No such a character.', 404);
    }

    if (episode.characters.find((element) => element._id.equals(characterId))) {
      throw new HttpException('Character already added for this episode.', 409);
    }

    episode.characters.push(character);
    character.episodes.push(episode);

    await transaction(async (session) => {
      await this.episodesRepository.updateOne(episodeId, episode, session);
      await this.charactersRepository.updateOne(characterId, character, session);
    }, this.connection);

    return this.episodesRepository.findById(episodeId);
  }

  async deleteCharacter(episodeId: string, characterId: string) {
    const episode = await this.episodesRepository.findById(episodeId);
    if (!episode) {
      throw new HttpException('No such an episode.', 404);
    }

    const character = await this.charactersRepository.findById(characterId);
    if (!character) {
      throw new HttpException('No such a character.', 404);
    }

    const characterIndex = episode.characters.findIndex((element) => element._id.equals(characterId));
    if (characterIndex < 0) {
      throw new HttpException('No such a character for this episode.', 404);
    }

    const episodeIndex = episode.characters.findIndex((element) => element._id.equals(characterId));
    episode.characters.splice(characterIndex, 1);
    if (episodeIndex >= 0) {
      character.episodes.splice(episodeIndex, 1);
    }

    await transaction(async (session) => {
      await this.episodesRepository.updateOne(episodeId, episode, session);
      await this.charactersRepository.updateOne(characterId, character, session);
    }, this.connection);

    return this.episodesRepository.findById(episodeId);
  }
}
