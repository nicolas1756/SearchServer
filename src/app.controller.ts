import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  search(
    @Query('q') query?: string,
    @Query('m') mode: string = 'all',
  ): Promise<unknown> {
    if (!query?.trim()) {
      throw new BadRequestException(
        'Missing query parameter q. Example: /?q=nestjs',
      );
    }

    return this.appService.search(query.trim(), mode);
  }
}
