import { Module } from '@nestjs/common';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import { ParserService } from 'src/parser/parser.service';
import { BaseApiService } from 'src/base-api/base-api.service';

@Module({
  imports: [],
  controllers: [MealController],
  providers: [MealService, ParserService, BaseApiService],
})
export class MealModule {}
