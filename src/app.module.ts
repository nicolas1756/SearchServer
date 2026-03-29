import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { BraveService } from './brave/brave.service';
import { AuthService } from './auth/auth.service';
import { MapsService } from './maps/maps.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController],
  providers: [AppService, BraveService, AuthService, MapsService],
})
export class AppModule {}
