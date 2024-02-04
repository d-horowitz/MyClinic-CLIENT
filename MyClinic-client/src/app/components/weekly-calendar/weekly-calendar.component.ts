import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { calendarDay } from '../../types';
import { CommonModule, DatePipe } from '@angular/common';
import { CalendarDayComponent } from "../calendar-day/calendar-day.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { DateAddPipe } from '../../pipes/date-add.pipe';

@Component({
  selector: 'app-weekly-calendar',
  standalone: true,
  templateUrl: './weekly-calendar.component.html',
  styleUrl: './weekly-calendar.component.css',
  imports: [
    CommonModule,
    CalendarDayComponent,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    DateAddPipe,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [DatePipe]
})
export class WeeklyCalendarComponent {
  @Input() schedule!: calendarDay[];
  @Input() disableBefore: boolean = false;
  @Input() disableNext: boolean = false;
  @Input() date: string = '';
  @Input() warnDisabled: boolean = false;
  @Output() dateChanged: EventEmitter<MatDatepickerInputEvent<any, any>> = new EventEmitter<MatDatepickerInputEvent<any, any>>();
  @Output() beforeClicked: EventEmitter<void> = new EventEmitter();
  @Output() nextClicked: EventEmitter<void> = new EventEmitter();
  @Output() itemClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor(public datePipe: DatePipe) { }

  track(index: number, cd: calendarDay) {
    return cd.dayOfWeek;
  }
}
