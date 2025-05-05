import { HttpException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { CharactersRepository } from '../../repositories/characters.repository';
import { SaveCharacterDto } from '../../dtos/saveCharacter.dto';
import { UpdateOneCharacterDto } from '../../dtos/updateOneCharacter.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { EpisodesRepository } from '../../repositories/episodes.repository';
import { PlanetsRepository } from '../../repositories/planets.repository';
import { transaction } from '../../utils/transaction';

@Injectable()
export class CharactersService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private readonly charactersRepository: CharactersRepository,
    private readonly episodesRepository: EpisodesRepository,
    private readonly planetsRepository: PlanetsRepository,
  ) {}

  find(paginationQueryDto: PaginationQueryDto) {
    return this.charactersRepository.find(paginationQueryDto);
  }

  save(saveCharacterDto: SaveCharacterDto) {
    return this.charactersRepository.save(saveCharacterDto);
  }

  updateOne(characterId: string, updateOneCharacterDto: UpdateOneCharacterDto) {
    return this.charactersRepository.updateOne(characterId, updateOneCharacterDto);
  }

  deleteOne(characterId: string) {
    return this.charactersRepository.deleteOne(characterId);
  }

  async addEpisode(characterId: string, episodeId: string) {
    const character = await this.charactersRepository.findById(characterId);
    if (!character) {
      throw new HttpException('No such a character.', 404);
    }

    const episode = await this.episodesRepository.findById(episodeId);
    if (!episode) {
      throw new HttpException('No such an episode.', 404);
    }

    if (character.episodes.find((element) => element._id.equals(episodeId))) {
      throw new HttpException('Episode already added for this character.', 409);
    }

    character.episodes.push(episode);
    episode.characters.push(character);

    await transaction(async (session) => {
      await this.charactersRepository.updateOne(characterId, character, session);
      await this.episodesRepository.updateOne(episodeId, episode, session);
    }, this.connection);

    return this.charactersRepository.findById(characterId);
  }

  async deleteEpisode(characterId: string, episodeId: string) {
    const character = await this.charactersRepository.findById(characterId);
    if (!character) {
      throw new HttpException('No such a character.', 404);
    }

    const episode = await this.episodesRepository.findById(episodeId);
    if (!episode) {
      throw new HttpException('No such an episode.', 404);
    }

    const episodeIndex = character.episodes.findIndex((element) => element._id.equals(episodeId));
    if (episodeIndex < 0) {
      throw new HttpException('No such an episode for this character.', 404);
    }

    const characterIndex = episode.characters.findIndex((element) => element._id.equals(characterId));
    character.episodes.splice(episodeIndex, 1);
    if (characterIndex >= 0) {
      episode.characters.splice(characterIndex, 1);
    }

    await transaction(async (session) => {
      await this.charactersRepository.updateOne(characterId, character, session);
      await this.episodesRepository.updateOne(episodeId, episode, session);
    }, this.connection);

    return this.charactersRepository.findById(characterId);
  }

  async addPlanet(characterId: string, planetId: string) {
    const character = await this.charactersRepository.findById(characterId);
    if (!character) {
      throw new HttpException('No such a character.', 404);
    }

    const planet = await this.planetsRepository.findById(planetId);
    if (!planet) {
      throw new HttpException('No such a planet.', 404);
    }

    if (character.planet) {
      throw new HttpException('Planet already added for this character.', 409);
    }

    character.planet = planet;
    planet.characters.push(character);

    await transaction(async (session) => {
      await this.charactersRepository.updateOne(characterId, character, session);
      await this.planetsRepository.updateOne(planetId, planet, session);
    }, this.connection);

    return this.charactersRepository.findById(characterId);
  }

  async deletePlanet(characterId: string, planetId: string) {
    const character = await this.charactersRepository.findById(characterId);
    if (!character) {
      throw new HttpException('No such a character.', 404);
    }

    const planet = await this.planetsRepository.findById(planetId);
    if (!planet) {
      throw new HttpException('No such a planet.', 404);
    }

    if (!character.planet?._id.equals(planetId)) {
      throw new HttpException('No such a planet for this character.', 404);
    }

    const characterIndex = planet.characters.findIndex((element) => element._id.equals(characterId));
    character.planet = null;
    if (characterIndex >= 0) {
      planet.characters.splice(characterIndex, 1);
    }

    await transaction(async (session) => {
      await this.charactersRepository.updateOne(characterId, character, session);
      await this.planetsRepository.updateOne(planetId, planet, session);
    }, this.connection);

    return this.charactersRepository.findById(characterId);
  }
}
