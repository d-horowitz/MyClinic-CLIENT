import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timediff',
  standalone: true
})
export class TimediffPipe implements PipeTransform {

  transform(value: string, args: string): string {
    return ((hours(value) * 60 + minutes(value) - hours(args) * 60 - minutes(args)) * 2).toString() + 'px';
  }

}
function hours(timestr: string) {
  return Number(timestr.split(":")[0]);
}
function minutes(timestr: string) {
  return Number(timestr.split(":")[1]);
}
