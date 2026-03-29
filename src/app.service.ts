/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { BraveService } from './brave/brave.service';
import { MapsService } from './maps/maps.service';

@Injectable()
export class AppService {
  constructor(private readonly braveService: BraveService, private readonly mapsService: MapsService) {}

  search(query: string, mode = 'all'): Promise<unknown> {

    if (mode === 'all') {
      return this.braveService.searchWeb(query);
    }

    if (mode === 'maps') {
      // Placeholder for maps search implementation
    }

  }
}
