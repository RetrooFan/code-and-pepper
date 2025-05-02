import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Character, CharacterDocument } from '../../entities/character.entity';
import { CreateCharacterDto } from '../../dtos/createCharacter.dto';
import { UpdateOneCharacterDto } from '../../dtos/updateOneCharacter.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { IdDto } from '../../dtos/id.dto';
import { Episode, EpisodeDocument } from '../../entities/episode.entity';
import { Planet, PlanetDocument } from '../../entities/planet.entity';

@Injectable()
export class CharactersRepository {
  constructor(
    @InjectModel(Character.name, CharactersRepository.name)
    private readonly characterModel: Model<CharacterDocument>,
    @InjectModel(Episode.name, CharactersRepository.name)
    private readonly episodeModel: Model<EpisodeDocument>,
    @InjectModel(Planet.name, CharactersRepository.name)
    private readonly planetModel: Model<PlanetDocument>,
  ) {}

  find(paginationQueryDto: PaginationQueryDto) {
    return this.characterModel
      .find<Character>()
      .sort({ createdAt: 1 })
      .skip(paginationQueryDto.offset)
      .limit(paginationQueryDto.limit)
      .populate({ path: 'episodes', model: this.episodeModel })
      .populate({ path: 'planet', model: this.planetModel });
  }

  create(createCharacterDto: CreateCharacterDto) {
    return this.characterModel.create(createCharacterDto);
  }

  updateOne(idDto: IdDto, updateOneCharacterDto: UpdateOneCharacterDto) {
    return this.characterModel.updateOne({ _id: idDto.id }, updateOneCharacterDto);
  }

  deleteOne(idDto: IdDto) {
    return this.characterModel.deleteOne({ _id: idDto.id });
  }
}
