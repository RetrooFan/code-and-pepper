import { INestApplication } from '@nestjs/common';
import { connections } from 'mongoose';
import { App } from 'supertest/types';

afterAll(async () => {
  while (connections.length) {
    await connections.pop()?.close();
  }

  await (global.app as INestApplication<App>).close();
});
