import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseApiService {
  async get<T>(url: string) {
    const response = await fetch(url, {
      method: 'GET',
    });

    const data = await response.json();

    return data as T;
  }

  buidUrl(
    baseUrl: string,
    endpoint: string,
    params?: Record<string, string>[],
  ) {
    let url = `${baseUrl}/${endpoint}`;

    if (params?.length) {
      url += '?';

      for (const param of params) {
        const paramName = Object.keys(param)[0];
        const paramValue = param[paramName];
        url += `${paramName}=${paramValue},`;
      }

      url = url.slice(0, -1);
    }

    return url;
  }
}
