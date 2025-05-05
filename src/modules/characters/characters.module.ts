import { Module } from '@nestjs/common';

import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { RepositoryModule } from '../../repositories/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
