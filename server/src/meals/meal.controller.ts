import { Controller, Get, Param, Query } from '@nestjs/common';
import { MealService } from './meal.service';
import { ParserService } from 'src/parser/parser.service';
import { apiPathNames } from 'src/constants/apiPathNames';
import { searchParamNames } from 'src/constants/search-param-names';

@Controller('/api' + apiPathNames.meals)
export class MealController {
  constructor(
    private readonly mealService: MealService,
    private readonly parserService: ParserService,
  ) {}

  @Get()
  async getAll(@Query(searchParamNames.filter) filter?: string) {
    const parsedFilter = filter
      ? this.parserService.parseFilter(filter)
      : undefined;
    return this.mealService.getAll(parsedFilter);
  }

  @Get(`:${searchParamNames.id}`)
  async getOne(@Param(searchParamNames.id) id: string) {
    return this.mealService.getOne(id);
  }
}
