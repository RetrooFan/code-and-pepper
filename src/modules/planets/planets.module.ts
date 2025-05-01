import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { DbConnection } from '../../enums/dbConnection.enum';
import { Planet, planetSchema } from '../../entities/planet.entity';
import { PlanetsRepository } from './planets.repository';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongoDbUri'),
      }),
      connectionName: DbConnection.PLANETS,
    }),
    MongooseModule.forFeature(
      [
        {
          name: Planet.name,
          schema: planetSchema,
        },
      ],
      DbConnection.PLANETS,
    ),
  ],
  controllers: [PlanetsController],
  providers: [PlanetsService, PlanetsRepository],
})
export class PlanetsModule {}
