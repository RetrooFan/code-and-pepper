import { INestApplication } from '@nestjs/common';
import { connections } from 'mongoose';
import { App } from 'supertest/types';

afterEach(async () => {
  while (connections.length) {
    await connections.pop()?.close();
  }
});

afterAll(async () => {
  await (global.app as INestApplication<App>).close();
});
