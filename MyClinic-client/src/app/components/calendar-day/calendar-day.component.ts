import { Component, Input, ViewEncapsulation } from '@angular/core';
import { calendarDay, calendarDayItem } from '../../types';
import { CommonModule } from '@angular/common';
import { TimediffPipe } from "../../pipes/timediff.pipe";
import { DayHeightPipe } from "../../pipes/day-height.pipe";
import { DayNamePipe } from "../../pipes/day-name.pipe";
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
//import Tooltip from 'bootstrap/js/src/tooltip.js';

@Component({
  selector: 'app-calendar-day',
  standalone: true,
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.css'],
  imports: [CommonModule, TimediffPipe, DayHeightPipe, DayNamePipe, MatCardModule, MatButtonModule, MatTooltipModule],
  encapsulation: ViewEncapsulation.None
})
export class CalendarDayComponent {
  @Input() day!: calendarDay;

  track(index: number, cd: calendarDayItem) {
    return index;
  }
  event = {
    firstEvent: {
      name: "firstie",
      startDate: new Date("01/01/2020"),
      endDate: new Date("01/10/2020")
    },
    secondEvent: {
      name: "secondie",
      startDate: new Date("02/01/2020"),
      endDate: new Date("02/10/2020")
    }
  }
  getTooltip(): string {
    return `Name: ${this.event.firstEvent.name}
    Start: ${this.event.firstEvent.startDate.toLocaleString()}
    End: ${this.event.firstEvent.endDate.toLocaleString()}

    ---------------

    Name: ${this.event.secondEvent.name}
    Start: ${this.event.secondEvent.startDate.toLocaleString()}
    End: ${this.event.secondEvent.endDate.toLocaleString()}`;
  }
}
