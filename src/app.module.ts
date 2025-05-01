import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HelloWorldModule } from './modules/helloWorld/helloWorld.module';
import configuration from './configuration';
import { EpisodesModule } from './modules/episodes/episodes.module';
import { PlanetsModule } from './modules/planets/planets.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    HelloWorldModule,
    EpisodesModule,
    PlanetsModule,
  ],
})
export class AppModule {}
