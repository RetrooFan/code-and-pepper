import { HttpException, Injectable } from '@nestjs/common';

import { CharactersRepository } from '../../repositories/characters.repository';
import { SaveCharacterDto } from '../../dtos/saveCharacter.dto';
import { UpdateOneCharacterDto } from '../../dtos/updateOneCharacter.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { IdDto } from '../../dtos/id.dto';
import { EpisodesRepository } from '../../repositories/episodes.repository';

@Injectable()
export class CharactersService {
  constructor(
    private readonly charactersRepository: CharactersRepository,
    private readonly episodesRepository: EpisodesRepository,
  ) {}

  find(paginationQueryDto: PaginationQueryDto) {
    return this.charactersRepository.find(paginationQueryDto);
  }

  save(saveCharacterDto: SaveCharacterDto) {
    return this.charactersRepository.save(saveCharacterDto);
  }

  async addEpisode(characterIdDto: IdDto, episodeIdDto: IdDto) {
    const character = await this.charactersRepository.findById(characterIdDto.id);
    if (!character) {
      throw new HttpException('No such a character.', 400);
    }

    const episode = await this.episodesRepository.findById(episodeIdDto.id);
    if (!episode) {
      throw new HttpException('No such an episode.', 400);
    }

    character.episodes.push(episode);
    episode.characters.push(character);

    await this.charactersRepository.updateOne(character._id.toString(), character);
    await this.episodesRepository.updateOne(episode._id.toString(), episode);

    return character;
  }

  updateOne(idDto: IdDto, updateOneCharacterDto: UpdateOneCharacterDto) {
    return this.charactersRepository.updateOne(idDto.id, updateOneCharacterDto);
  }

  deleteOne(idDto: IdDto) {
    return this.charactersRepository.deleteOne(idDto.id);
  }
}
