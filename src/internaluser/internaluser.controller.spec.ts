import { Test, TestingModule } from '@nestjs/testing';
import { InternaluserController } from './internaluser.controller';
import { InternaluserService } from './internaluser.service';

describe('InternaluserController', () => {
  let controller: InternaluserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternaluserController],
      providers: [InternaluserService],
    }).compile();

    controller = module.get<InternaluserController>(InternaluserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
