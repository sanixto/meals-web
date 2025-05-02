export class BaseApi {
  #baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

  async get<T>(path: string) {
    const response = await fetch(this.#baseUrl + path, {
      method: "GET",
    });

    const data = await response.json();

    return data as T;
  }
}
