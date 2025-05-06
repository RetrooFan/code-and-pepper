import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import TestAgent from 'supertest/lib/agent';

import { AppModule } from '../src/app.module';
import { Planet } from '../src/entities/planet.entity';

describe('AppController (e2e)', () => {
  let api: TestAgent;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
    const app = moduleFixture.createNestApplication<INestApplication<App>>();
    global.app = app;

    await app.init();
    api = request(app.getHttpServer());
  });

  it('should return all planets', async () => {
    const result = await api.get('/planets').expect(HttpStatus.OK);

    const planetsNames = (result.body as Planet[]).map((planet) => planet.name);

    expect(planetsNames).toEqual([]);
  });
});
