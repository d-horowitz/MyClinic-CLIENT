import { Component, Input, OnInit } from '@angular/core';
import { calendarDay } from '../../types';
import { CommonModule } from '@angular/common';
import { CalendarDayComponent } from "../calendar-day/calendar-day.component";
import { range } from 'rxjs';

@Component({
  selector: 'app-weekly-calendar',
  standalone: true,
  templateUrl: './weekly-calendar.component.html',
  styleUrl: './weekly-calendar.component.css',
  imports: [CommonModule, CalendarDayComponent]
})
export class WeeklyCalendarComponent {
  @Input() schedule!: calendarDay[];
}
