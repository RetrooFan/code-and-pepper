import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import TestAgent from 'supertest/lib/agent';

import { AppModule } from '../src/app.module';
import { Character } from '../src/entities/character.entity';

describe('CharactersController (e2e)', () => {
  let api: TestAgent;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
    const app = moduleFixture.createNestApplication<INestApplication<App>>();
    global.app = app;

    await app.init();
    api = request(app.getHttpServer());
  });

  it('should return all characters', async () => {
    const result = await api.get('/characters').expect(HttpStatus.OK);

    const charactersNames = (result.body as Character[]).map((character) => character.name);

    expect(charactersNames).toEqual([]);
  });
});
