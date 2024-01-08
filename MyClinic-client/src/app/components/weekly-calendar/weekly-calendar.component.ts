import { Component, Input } from '@angular/core';
import { calendarDay } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weekly-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weekly-calendar.component.html',
  styleUrl: './weekly-calendar.component.css'
})
export class WeeklyCalendarComponent {
  @Input() schedule!: calendarDay[];
}
