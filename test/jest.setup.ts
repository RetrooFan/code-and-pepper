import { connections } from 'mongoose';

afterEach(async () => {
  while (connections.length) {
    await connections.pop()?.close();
  }
});

afterAll(async () => {
  await (global.app as { close: () => Promise<boolean> }).close();
});
