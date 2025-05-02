export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb?: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
}

export interface MealResponse {
  meals: Meal[];
}
