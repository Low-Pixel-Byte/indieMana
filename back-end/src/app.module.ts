import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [CategoryModule, GamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
