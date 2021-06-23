import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({})], // module 을 불러왔으면 추가를 해줘야함
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
