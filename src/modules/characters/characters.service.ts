import { Injectable } from '@nestjs/common';

import { CharactersRepository } from '../../repositories/characters.repository';
import { SaveCharacterDto } from '../../dtos/saveCharacter.dto';
import { UpdateOneCharacterDto } from '../../dtos/updateOneCharacter.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { IdDto } from '../../dtos/id.dto';

@Injectable()
export class CharactersService {
  constructor(private readonly charactersRepository: CharactersRepository) {}

  find(paginationQueryDto: PaginationQueryDto) {
    return this.charactersRepository.find(paginationQueryDto);
  }

  save(saveCharacterDto: SaveCharacterDto) {
    return this.charactersRepository.save(saveCharacterDto);
  }

  updateOne(idDto: IdDto, updateOneCharacterDto: UpdateOneCharacterDto) {
    return this.charactersRepository.updateOne(idDto, updateOneCharacterDto);
  }

  deleteOne(idDto: IdDto) {
    return this.charactersRepository.deleteOne(idDto);
  }
}
