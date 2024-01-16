import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WeeklyCalendarComponent } from '../weekly-calendar/weekly-calendar.component';
import { getWeeklySchedule, doctor, calendarDay } from '../../types';
import { range } from 'rxjs';

@Component({
  selector: 'app-doctor-weekly-schedule',
  standalone: true,
  templateUrl: './doctor-weekly-schedule.component.html',
  styleUrl: './doctor-weekly-schedule.component.css',
  imports: [HttpClientModule, RouterModule, CommonModule, WeeklyCalendarComponent,]
})
export class DoctorWeeklyScheduleComponent {
  doctor!: doctor;
  constructor(private http: HttpClient, private route: ActivatedRoute) { };
  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(
      p => {
        const id = p.get("id");
        this.http.get<doctor>(`https://localhost:7099/api/doctors/${id}`)
          .subscribe(
            r => {
              this.doctor = r;
            }
          )
      }
    );
  }
  getSchedule(): calendarDay[] {
    const schedule = getWeeklySchedule(this.doctor);
    const finalSchedule: calendarDay[] = [];
    range(0, 6).forEach(element => {
      if (schedule[0] && schedule[0].dayOfWeek == element)
        finalSchedule.push(schedule.shift() ?? { dayOfWeek: element, items: [] })
      else
        finalSchedule.push({ dayOfWeek: element, items: [] })
    })
    return finalSchedule;
  }
}

