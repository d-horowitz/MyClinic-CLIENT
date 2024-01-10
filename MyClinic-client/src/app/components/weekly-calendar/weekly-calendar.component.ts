import { Component, Input, OnInit } from '@angular/core';
import { calendarDay } from '../../types';
import { CommonModule } from '@angular/common';
import { CalendarDayComponent } from "../calendar-day/calendar-day.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { TempComponent } from "../temp/temp.component";

@Component({
  selector: 'app-weekly-calendar',
  standalone: true,
  templateUrl: './weekly-calendar.component.html',
  styleUrl: './weekly-calendar.component.css',
  imports: [CommonModule, CalendarDayComponent, MatButtonModule, MatTooltipModule, TempComponent]
})
export class WeeklyCalendarComponent {
  @Input() schedule!: calendarDay[];
  track(index: number, cd: calendarDay) {
    return cd.dayOfWeek;
  }
}
