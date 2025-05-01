import { Module } from '@nestjs/common';
import { HelloWorldModule } from './modules/helloWorld/helloWorld.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] }), HelloWorldModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
