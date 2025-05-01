import { Test, TestingModule } from '@nestjs/testing';
import { HelloWorldController } from './helloWorld.controller';
import { HelloWorldService } from './helloWorld.service';

describe('HelloWorldController', () => {
  let helloWorldController: HelloWorldController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HelloWorldController],
      providers: [HelloWorldService],
    }).compile();

    helloWorldController = app.get<HelloWorldController>(HelloWorldController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(helloWorldController.getHello()).toBe('Hello World!');
    });
  });
});
