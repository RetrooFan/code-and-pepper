import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HelloWorldModule } from './modules/helloWorld/helloWorld.module';
import config from './config';
import { EpisodesModule } from './modules/episodes/episodes.module';
import { PlanetsModule } from './modules/planets/planets.module';
import { CharactersModule } from './modules/characters/characters.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    HelloWorldModule,
    EpisodesModule,
    PlanetsModule,
    CharactersModule,
  ],
})
export class AppModule {}
