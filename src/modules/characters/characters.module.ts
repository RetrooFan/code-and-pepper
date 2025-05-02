import { Module } from '@nestjs/common';

import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { CharactersRepositoryModule } from '../../repositories/characters/charactersRepository.module';

@Module({
  imports: [CharactersRepositoryModule],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
