import { connections } from 'mongoose';

afterEach(async () => {
  while (connections.length) {
    await connections.pop()?.close();
  }
});
