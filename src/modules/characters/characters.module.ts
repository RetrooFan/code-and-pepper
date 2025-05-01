import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { DbConnection } from '../../enums/dbConnection.enum';
import { Character, characterSchema } from './character.entity';
import { CharactersRepository } from './characters.repository';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongoDbUri'),
      }),
      connectionName: DbConnection.CHARACTERS,
    }),
    MongooseModule.forFeature(
      [
        {
          name: Character.name,
          schema: characterSchema,
        },
      ],
      DbConnection.CHARACTERS,
    ),
  ],
  controllers: [CharactersController],
  providers: [CharactersService, CharactersRepository],
})
export class CharactersModule {}
