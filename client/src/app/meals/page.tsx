import { routeNames } from "@/constants/route-names";
import { Meal, MealResponse } from "@/interfaces/meal.interface";
import Image from "next/image";
import Link from "next/link";
import { BaseApi } from "../base-api/base-api";
import { searchParamNames } from "@/constants/search-param-names";

interface MealsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata = {
  title: "Recipes",
  description: "Recipes",
};

const baseApi = new BaseApi();

export default async function MealsPage({ searchParams }: MealsPageProps) {
  const { filter } = await searchParams;
  let path = `/${routeNames.meals}`;

  if (filter) {
    path += `?${searchParamNames.filter}=${filter}`;
  }

  const { meals } = await baseApi.get<MealResponse>(path);

  return (
    <main className="lg:px-40 2xl:px-80 py-10">
      <h1 className="text-4xl pb-10 text-center font-bold">
        {filter ? filter?.split("=")[1] : null} Meals
      </h1>
      <MealsGrid meals={meals} />
    </main>
  );
}

export function MealsGrid({ meals }: { meals: Meal[] }) {
  return (
    <div className="grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {meals?.map((meal) => (
        <Link href={`/${routeNames.meals}/${meal.idMeal}`} key={meal.idMeal}>
          <MealCard key={meal.idMeal} meal={meal} />
        </Link>
      ))}
    </div>
  );
}

export function MealCard({ meal }: { meal: Meal }) {
  return (
    <div className="flex flex-col gap-2 text-center">
      {meal.strMeal && <h2 className="font-medium text-lg">{meal.strMeal}</h2>}
      {meal?.strMealThumb && (
        <div className="relative w-full h-48 rounded-lg">
          <Image src={meal.strMealThumb} alt={meal.idMeal} fill />
        </div>
      )}
    </div>
  );
}
