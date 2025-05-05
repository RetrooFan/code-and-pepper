import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { Episode, episodeSchema } from '../entities/episode.entity';
import { EpisodesRepository } from './episodes.repository';
import { Character, characterSchema } from '../entities/character.entity';
import { Planet, planetSchema } from '../entities/planet.entity';
import { CharactersRepository } from './characters.repository';
import { PlanetsRepository } from './planets.repository';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongoDbUri'),
      }),
    }),
    MongooseModule.forFeature([
      {
        name: Episode.name,
        schema: episodeSchema,
      },
      {
        name: Character.name,
        schema: characterSchema,
      },
      {
        name: Planet.name,
        schema: planetSchema,
      },
    ]),
  ],
  providers: [EpisodesRepository, CharactersRepository, PlanetsRepository],
  exports: [EpisodesRepository, CharactersRepository, PlanetsRepository],
})
export class RepositoryModule {}
