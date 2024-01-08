import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WeeklyCalendarComponent } from '../weekly-calendar/weekly-calendar.component';
import { getWeeklySchedule, doctor, calendarDay } from '../../types';

@Component({
  selector: 'app-doctor-schedule',
  standalone: true,
  templateUrl: './doctor-schedule.component.html',
  styleUrl: './doctor-schedule.component.css',
  imports: [HttpClientModule, RouterModule, CommonModule, WeeklyCalendarComponent,]
})
export class DoctorScheduleComponent {
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
              console.log(r);
            }
          )
      }
    );
  }
  getSchedule(): calendarDay[] {
    return getWeeklySchedule(this.doctor)
  }
}

