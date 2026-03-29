import { Test, TestingModule } from '@nestjs/testing';
import { BraveService } from './brave.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

describe('BraveService', () => {
  let service: BraveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BraveService,
        {
          provide: HttpService,
          useValue: { get: jest.fn() },
        },
        {
          provide: ConfigService,
          useValue: { get: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<BraveService>(BraveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
