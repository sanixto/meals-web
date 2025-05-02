export const externalApiUrl = 'https://www.themealdb.com/api/json/v1/1';

export const externalApiEndpoints = {
  filter: 'filter.php',
  search: 'search.php?s',
  lookup: 'lookup.php',
} as const;

export const externalApiParams = {
  id: 'i',
} as const;
