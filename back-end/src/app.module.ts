import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { GamesModule } from './games/games.module';
import { DeveloperModule } from './developer/developer.module';

@Module({
  imports: [CategoryModule, GamesModule, DeveloperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
