import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BadRequestException } from '@nestjs/common';

describe('AppController', () => {
  let app: TestingModule;
  const appServiceMock = {
    search: jest.fn(),
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: appServiceMock,
        },
      ],
    }).compile();
  });

  describe('search', () => {
    it('should throw if q is missing', () => {
      const appController = app.get(AppController);
      expect(() => appController.search(undefined)).toThrow(BadRequestException);
    });

    it('should call appService.search with query', async () => {
      const appController = app.get(AppController);
      appServiceMock.search.mockResolvedValueOnce({ type: 'SearchResponse' });

      await appController.search('nestjs');

      expect(appServiceMock.search).toHaveBeenCalledWith('nestjs');
    });
  });
});
