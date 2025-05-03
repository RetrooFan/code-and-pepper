import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { Character, characterSchema } from '../entities/character.entity';
import { CharactersRepository } from './characters.repository';
import { Episode, episodeSchema } from '../entities/episode.entity';
import { Planet, planetSchema } from '../entities/planet.entity';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongoDbUri'),
      }),
      connectionName: CharactersRepository.name,
    }),
    MongooseModule.forFeature(
      [
        {
          name: Character.name,
          schema: characterSchema,
        },
        {
          name: Episode.name,
          schema: episodeSchema,
        },
        {
          name: Planet.name,
          schema: planetSchema,
        },
      ],
      CharactersRepository.name,
    ),
  ],
  providers: [CharactersRepository],
  exports: [CharactersRepository],
})
export class CharactersRepositoryModule {}
