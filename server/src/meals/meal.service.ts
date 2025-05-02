import { Injectable } from '@nestjs/common';
import { Meal } from './meal.interface';
import { Filter } from 'src/interfaces/filter.interface';
import {
  externalApiEndpoints,
  externalApiParams,
  externalApiUrl,
} from './meal.constants';
import { BaseApiService } from 'src/base-api/base-api.service';

@Injectable()
export class MealService {
  #apiUrl = externalApiUrl;

  constructor(private readonly baseApiService: BaseApiService) {}

  async getAll(filter?: Filter) {
    let url: string;

    if (filter) {
      url = this.baseApiService.buidUrl(
        this.#apiUrl,
        externalApiEndpoints.filter,
        [{ [filter.propertyName]: filter.propertyValue }],
      );
    } else {
      url = this.baseApiService.buidUrl(
        this.#apiUrl,
        externalApiEndpoints.search,
      );
    }

    const meals = await this.baseApiService.get<Meal[]>(url);

    return meals;
  }

  async getOne(id: string) {
    const url = this.baseApiService.buidUrl(
      this.#apiUrl,
      externalApiEndpoints.lookup,
      [{ [externalApiParams.id]: id }],
    );

    const meal = await this.baseApiService.get<Meal>(url);

    return meal;
  }
}
