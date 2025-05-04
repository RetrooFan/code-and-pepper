import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import TestAgent from 'supertest/lib/agent';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let api: TestAgent;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
    const app = moduleFixture.createNestApplication<INestApplication<App>>();
    global.app = app;

    await app.init();

    api = request(app.getHttpServer());
  });

  it('/helloWorld (GET)', () => {
    return api.get('/helloWorld').expect(200).expect('Hello World!');
  });
});
