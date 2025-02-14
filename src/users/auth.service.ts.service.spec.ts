import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceTsService } from './auth.service.ts/auth.service.ts.service';

describe('AuthServiceTsService', () => {
  let service: AuthServiceTsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthServiceTsService],
    }).compile();

    service = module.get<AuthServiceTsService>(AuthServiceTsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
