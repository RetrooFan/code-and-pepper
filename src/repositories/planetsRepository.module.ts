import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { Planet, planetSchema } from '../entities/planet.entity';
import { PlanetsRepository } from './planets.repository';
import { Character, characterSchema } from '../entities/character.entity';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongoDbUri'),
      }),
      connectionName: PlanetsRepository.name,
    }),
    MongooseModule.forFeature(
      [
        {
          name: Planet.name,
          schema: planetSchema,
        },
        {
          name: Character.name,
          schema: characterSchema,
        },
      ],
      PlanetsRepository.name,
    ),
  ],
  providers: [PlanetsRepository],
  exports: [PlanetsRepository],
})
export class PlanetsRepositoryModule {}
