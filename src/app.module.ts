import { Module } from '@nestjs/common';
import { HelloWorldModule } from './modules/helloWorld/helloWorld.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { EpisodesModule } from './modules/episodes/episodes.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] }), HelloWorldModule, EpisodesModule],
})
export class AppModule {}
