/* eslint-disable prettier/prettier */
import { BadGatewayException, InternalServerErrorException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
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

        if (!apiKey) {
            throw new InternalServerErrorException('Missing BRAVE_API_KEY in environment variables.');
        }

        try {
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
        } catch (error) {
            const axiosError = error as AxiosError<any>;
            const detail =
                axiosError.response?.data?.error?.detail ??
                axiosError.message ??
                'Unknown error from Brave API';
            throw new BadGatewayException(`Brave search failed: ${detail}`);
        }
    }
}
