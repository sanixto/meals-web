import { BaseApi } from "@/app/base-api/base-api";
import { routeNames } from "@/constants/route-names";
import { searchParamNames } from "@/constants/search-param-names";
import { Meal, MealResponse } from "@/interfaces/meal.interface";
import Image from "next/image";
import Link from "next/link";

interface MealPageProps {
  params: { mealId: string };
}

const baseApi = new BaseApi();

export async function generateMetadata({ params: { mealId } }: MealPageProps) {
  const data = await baseApi.get<MealResponse>(
    `/${routeNames.meals}/${mealId}`
  );
  const meal = data.meals[0];

  return {
    title: `Recipe | ${meal.strMeal}`,
    description: `Recipe for ${meal.strMeal}`,
  };
}

export default async function MealPage({ params: { mealId } }: MealPageProps) {
  const data = await baseApi.get<MealResponse>(
    `/${routeNames.meals}/${mealId}`
  );
  const meal = data.meals[0];
  const ingredients = getAllIngredients(meal);

  const { meals: categoryMeals } = await baseApi.get<MealResponse>(
    `/${routeNames.meals}?${searchParamNames.filter}=${searchParamNames.category}=${meal.strCategory}`
  );

  return (
    <main className="p-10">
      <div className="grid-cols-1 grid lg:grid-cols-3 items-start gap-4">
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full h-40 md:h-80 lg:h-96 rounded-lg">
            {meal.strMealThumb && (
              <Image src={meal.strMealThumb} alt={meal.strMeal} fill />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5 justify-center items-center">
          <h1 className="text-4xl">{meal.strMeal}</h1>
          <Link
            href={`/meals?filter=a=${meal.strArea}`}
            className={"underline"}
          >
            <h2 className="text-xl text-gray-600">Country: {meal.strArea}</h2>
          </Link>
          <p>
            <b>Instructions:</b> {meal.strInstructions}
          </p>
          <p className="self-start">
            <b>Ingredients: </b>
            {ingredients.map((ing) => (
              <span key={ing}>
                <Link
                  className="text-blue-700 underline"
                  href={`/meals?filter=i=${ing}`}
                >
                  {ing}
                </Link>
                ,{" "}
              </span>
            ))}
          </p>
        </div>
        <div className="flex lg:items-center lg:justify-center ">
          <ul>
            {categoryMeals?.map((m) => (
              <div key={m.idMeal} className="flex items-center gap-3">
                {m.strMealThumb && (
                  <div className="relative w-16 h-16 rounded-lg">
                    <Image src={m.strMealThumb} alt={m.strMeal} fill />
                  </div>
                )}
                <Link
                  href={`/meals/${m.idMeal}`}
                  className="underline text-blue-700"
                >
                  {m.strMeal}
                </Link>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

function getAllIngredients(meal: Meal) {
  const maxIngredients = 20;
  const inggredientList = [];

  for (let i = 1; i <= maxIngredients; i++) {
    const propertyName = `strIngredient${i}` as keyof Meal;
    const ingredient = meal[propertyName];

    if (!ingredient) break;

    inggredientList.push(ingredient);
  }

  return inggredientList;
}
