import { Module } from '@nestjs/common';

import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { CharactersRepositoryModule } from '../../repositories/characters.repository.module';
import { EpisodesRepositoryModule } from '../../repositories/episodes.repository.module';

@Module({
  imports: [CharactersRepositoryModule, EpisodesRepositoryModule],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
