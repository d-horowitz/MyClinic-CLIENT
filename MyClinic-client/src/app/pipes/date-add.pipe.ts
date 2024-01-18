import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAdd',
  standalone: true
})
export class DateAddPipe implements PipeTransform {

  transform(value: string | Date, daysToAdd: number): Date {
    const result = new Date(value);
    result.setDate(result.getDate() + daysToAdd);
    return result;
  }

}
