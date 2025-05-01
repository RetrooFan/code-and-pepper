import { Module } from '@nestjs/common';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { DbConnection } from '../../enums/dbConnection.enum';
import { Episode, episodeSchema } from '../../entities/episode.entity';

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
  providers: [EpisodesService],
})
export class EpisodesModule {}
