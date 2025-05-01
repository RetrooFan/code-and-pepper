import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Character, CharacterDocument } from './character.entity';
import { DbConnection } from '../../enums/dbConnection.enum';
import { CreateCharacterDto } from './dtos/createCharacter.dto';
import { UpdateOneCharacterDto } from './dtos/updateOneCharacter.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { IdDto } from '../../dtos/id.dto';

@Injectable()
export class CharactersRepository {
  constructor(
    @InjectModel(Character.name, DbConnection.CHARACTERS)
    private readonly characterModel: Model<CharacterDocument>,
  ) {}

  find(paginationQueryDto: PaginationQueryDto) {
    return this.characterModel
      .find<Character>()
      .sort({ createdAt: 1 })
      .skip(paginationQueryDto.offset)
      .limit(paginationQueryDto.limit);
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
