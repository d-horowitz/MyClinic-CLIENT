import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
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
  @Input() warnDisabled: boolean = false;
  @Output() itemClicked: EventEmitter<number> = new EventEmitter<number>();

  track(index: number, cdi: calendarDayItem) {
    return cdi.id;
  }
}
