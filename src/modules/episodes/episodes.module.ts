import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { Episode, episodeSchema } from '../../entities/episode.entity';
import { EpisodesRepository } from './episodes.repository';
import { Character, characterSchema } from '../../entities/character.entity';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongoDbUri'),
      }),
      connectionName: EpisodesRepository.name,
    }),
    MongooseModule.forFeature(
      [
        {
          name: Episode.name,
          schema: episodeSchema,
        },
        {
          name: Character.name,
          schema: characterSchema,
        },
      ],
      EpisodesRepository.name,
    ),
  ],
  controllers: [EpisodesController],
  providers: [EpisodesService, EpisodesRepository],
})
export class EpisodesModule {}
