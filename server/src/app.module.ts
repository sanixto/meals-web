import { Module } from '@nestjs/common';
import { MealModule } from './meals/meal.module';

@Module({
  imports: [MealModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
