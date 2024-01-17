import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { calendarDay } from '../../types';
import { CommonModule } from '@angular/common';
import { CalendarDayComponent } from "../calendar-day/calendar-day.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-weekly-calendar',
  standalone: true,
  templateUrl: './weekly-calendar.component.html',
  styleUrl: './weekly-calendar.component.css',
  imports: [CommonModule, CalendarDayComponent, MatButtonModule, MatTooltipModule, MatIconModule]
})
export class WeeklyCalendarComponent {
  @Input() schedule!: calendarDay[];
  @Input() disableBefore: boolean = false;
  @Input() disableNext: boolean = false;
  @Output() beforeClicked:EventEmitter<void> = new EventEmitter();
  @Output() nextClicked:EventEmitter<void> = new EventEmitter();
  track(index: number, cd: calendarDay) {
    return cd.dayOfWeek;
  }
  before(){
    this.beforeClicked.emit();
  }
  
  next(){
    this.nextClicked.emit();
  }
}
