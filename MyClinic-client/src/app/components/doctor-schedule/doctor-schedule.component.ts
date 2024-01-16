import { Component } from '@angular/core';
import { WeeklyCalendarComponent } from "../weekly-calendar/weekly-calendar.component";
import { calendarDay, calendarDayItem, workDay } from '../../types';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { range } from 'rxjs';

@Component({
  selector: 'app-doctor-schedule',
  standalone: true,
  templateUrl: './doctor-schedule.component.html',
  styleUrl: './doctor-schedule.component.css',
  imports: [CommonModule, WeeklyCalendarComponent]
})
export class DoctorScheduleComponent {
  workDays!: workDay[];
  date = new Date();
  calendarDays: calendarDay[] = [];
  constructor(private http: HttpClient, private route: ActivatedRoute) { };
  ngOnInit(): void {
    this.updateDate();
  }
  updateDate() {
    this.route.parent?.paramMap.subscribe(
      p => {
        const id = p.get("id");
        this.http.get<workDay[]>(`https://localhost:7099/api/Doctors/${id}/schedule/${this.date.toISOString().substring(0, 10)}`)
          .subscribe(
            r => {
              this.workDays = r;
              this.setSchedule();
            }
          )
      }
    );
  }
  setSchedule() {
    this.calendarDays = [];
    const schedule = this.workDays.map(wd => {
      const cd: calendarDay = {
        dayOfWeek: new Date(wd.date).getDay(),
        items: wd.appointments.map(ap => {
          const item: calendarDayItem = {
            begin: ap.begin,
            end: ap.end,
            text: ``,
            tooltip: ap.patientId ? `patient ID: ${ap.patientId}` : ''
          };
          return item;
        })
      };
      return cd;
    });
    range(0, 6).forEach(element => {
      if (schedule[0] && schedule[0].dayOfWeek == element)
        this.calendarDays.push(schedule.shift() ?? { dayOfWeek: element, items: [] })
      else
        this.calendarDays.push({ dayOfWeek: element, items: [] })
    });
  }
  before() {
    //this.date = this.date.
  }
}