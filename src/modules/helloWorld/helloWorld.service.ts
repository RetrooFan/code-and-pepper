import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HelloWorldService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    console.log(this.configService.get<string>('nodeEnv'));
    console.log(this.configService.get<string>('mongoDbUri'));

    return 'Hello World!';
  }
}
