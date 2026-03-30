/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class BraveService {
    constructor(
        private readonly httpService: HttpService,
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    async searchWeb(query: string): Promise<unknown> {
        const apiKey = this.configService.get<string>('BRAVE_API_KEY');
        const url = 'https://api.search.brave.com/res/v1/web/search';

        const { data } = await firstValueFrom(
            this.httpService.get<unknown>(url, {
                params: { q: query },
                headers: {
                    Accept: 'application/json',
                    'Accept-Encoding': 'gzip',
                    'X-Subscription-Token': apiKey,
                },
            }),
        );

        return data;
    }
}
