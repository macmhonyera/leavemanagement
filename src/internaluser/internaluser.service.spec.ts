import { Test, TestingModule } from '@nestjs/testing';
import { InternaluserService } from './internaluser.service';

describe('InternaluserService', () => {
  let service: InternaluserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternaluserService],
    }).compile();

    service = module.get<InternaluserService>(InternaluserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
