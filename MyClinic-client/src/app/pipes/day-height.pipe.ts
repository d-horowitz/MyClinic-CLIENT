import { Pipe, PipeTransform } from '@angular/core';
import { calendarDayItem } from '../types';
import { TimediffPipe } from './timediff.pipe';

@Pipe({
  name: 'dayHeight',
  standalone: true
})
export class DayHeightPipe implements PipeTransform {
  transform(value: calendarDayItem[], ...args: unknown[]): string {
    const timediff = new TimediffPipe();
    const sortedSchedule = value.sort(
      (l1, l2) => {
        let str = timediff.transform(l2.end, l1.end);
        str = str.replace('px', '');
        return Number(str);
      }
    );
    return sortedSchedule.length ? timediff.transform(sortedSchedule[0].end, "08:00") : '15px';
  }

}
