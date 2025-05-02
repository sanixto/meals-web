import { Injectable } from '@nestjs/common';
import { ComparisonSign } from 'src/enums/comparison-sign';
import { Filter } from 'src/interfaces/filter.interface';

@Injectable()
export class ParserService {
  parseFilter(filter: string) {
    const [propertyName, propertyValue] = filter.split(ComparisonSign.EQUAL);
    const parsedFilter: Filter = {
      propertyName: propertyName,
      propertyValue: propertyValue,
    };

    return parsedFilter;
  }
}
