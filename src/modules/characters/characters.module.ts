import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { Character, characterSchema } from '../../entities/character.entity';
import { CharactersRepository } from './characters.repository';
import { Episode, episodeSchema } from '../../entities/episode.entity';
import { Planet, planetSchema } from '../../entities/planet.entity';

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
  controllers: [CharactersController],
  providers: [CharactersService, CharactersRepository],
})
export class CharactersModule {}
