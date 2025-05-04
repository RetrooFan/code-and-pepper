import { HttpException, Injectable } from '@nestjs/common';

import { CharactersRepository } from '../../repositories/characters.repository';
import { SaveCharacterDto } from '../../dtos/saveCharacter.dto';
import { UpdateOneCharacterDto } from '../../dtos/updateOneCharacter.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { EpisodesRepository } from '../../repositories/episodes.repository';
import { PlanetsRepository } from '../../repositories/planets.repository';

@Injectable()
export class CharactersService {
  constructor(
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

  async addEpisode(characterId: string, episodeId: string) {
    const character = await this.charactersRepository.findById(characterId);
    if (!character) {
      throw new HttpException('No such a character.', 400);
    }

    const episode = await this.episodesRepository.findById(episodeId);
    if (!episode) {
      throw new HttpException('No such an episode.', 400);
    }

    if (character.episodes.find((element) => element._id.equals(episodeId))) {
      throw new HttpException('Episode already added for this character.', 400);
    }

    character.episodes.push(episode);
    episode.characters.push(character);

    await this.charactersRepository.updateOne(characterId, character);
    await this.episodesRepository.updateOne(episodeId, episode);

    return character;
  }

  async deleteEpisode(characterId: string, episodeId: string) {
    const character = await this.charactersRepository.findById(characterId);
    if (!character) {
      throw new HttpException('No such a character.', 400);
    }

    const episode = await this.episodesRepository.findById(episodeId);
    if (!episode) {
      throw new HttpException('No such an episode.', 400);
    }

    const episodeIndex = character.episodes.findIndex((element) => element._id.equals(episode._id));
    if (episodeIndex < 0) {
      throw new HttpException('No such an episode for this character.', 400);
    }

    const characterIndex = episode.characters.findIndex((element) => element._id.equals(character._id));

    character.episodes.splice(episodeIndex, 1);
    if (characterIndex >= 0) {
      episode.characters.splice(characterIndex, 1);
    }

    await this.charactersRepository.updateOne(character._id.toString(), character);
    await this.episodesRepository.updateOne(episode._id.toString(), episode);

    return character;
  }

  async addPlanet(characterId: string, planetId: string) {
    const character = await this.charactersRepository.findById(characterId);
    if (!character) {
      throw new HttpException('No such a character.', 400);
    }

    const planet = await this.planetsRepository.findById(planetId);
    if (!planet) {
      throw new HttpException('No such a planet.', 400);
    }

    if (character.planet) {
      throw new HttpException('Planet already added for this character.', 400);
    }

    character.planet = planet;
    planet.characters.push(character);

    await this.charactersRepository.updateOne(characterId, character);
    await this.planetsRepository.updateOne(planetId, planet);

    return character;
  }

  updateOne(characterId: string, updateOneCharacterDto: UpdateOneCharacterDto) {
    return this.charactersRepository.updateOne(characterId, updateOneCharacterDto);
  }

  deleteOne(characterId: string) {
    return this.charactersRepository.deleteOne(characterId);
  }
}
