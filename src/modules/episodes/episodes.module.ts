import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { DbConnection } from '../../enums/dbConnection.enum';
import { Episode, episodeSchema } from './episode.entity';
import { EpisodesRepository } from './episodes.repository';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongoDbUri'),
      }),
      connectionName: DbConnection.EPISODES,
    }),
    MongooseModule.forFeature(
      [
        {
          name: Episode.name,
          schema: episodeSchema,
        },
      ],
      DbConnection.EPISODES,
    ),
  ],
  controllers: [EpisodesController],
  providers: [EpisodesService, EpisodesRepository],
})
export class EpisodesModule {}
