import { ConfigObject } from '@nestjs/config';

export default (): ConfigObject => ({
  nodeEnv: process.env.NODE_ENV,
  mongoDbUri: process.env.MONGODB_URI?.replace('?????', process.env.NODE_ENV ?? '?????'),
});
