import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoadingComponent } from "../loading/loading.component";
import { WeeklyCalendarComponent } from "../weekly-calendar/weekly-calendar.component";
import { calendarDay } from '../../types';
import { range } from 'rxjs';

@Component({
  selector: 'app-patient',
  standalone: true,
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css',
  imports: [HttpClientModule, CommonModule, RouterModule, LoadingComponent, WeeklyCalendarComponent]
})
export class PatientComponent implements OnInit {
  patient!: singlePatient;
  constructor(private http: HttpClient, private route: ActivatedRoute) { };
  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(
      p => {
        const id = p.get("id");
        this.http.get<singlePatient>(`https://localhost:7099/api/patients/${id}`)
          .subscribe(
            r => {
              this.patient = r;
            }
          )
      }
    );
  }
  getSchedule(): calendarDay[] {
    const schedule: calendarDay[] = [];
    range(0, 6).forEach(element => {
      const cd: calendarDay = { dayOfWeek: element, items: [] };
      this.patient.appointments.forEach(ap => {
        if (new Date(ap.date).getDay() == element) {
          cd.items.push({ text: ap.doctorName, begin: ap.begin, end: ap.end })
        }
      })
      schedule.push(cd);
    }
    );
    return schedule;
  }
}
type singlePatient = {
  id: number,
  name: string,
  gender: string,
  dateOfBirth: string,
  address: string,
  email: string,
  phone: string,
  appointments: appointment[]
}
type appointment = {
  id: number,
  patientId: number,
  subject: string,
  description: string,
  createdDate: string,
  cancelledDate: string,
  begin: string,
  end: string,
  workDayId: number,
  doctorId: number,
  doctorName: string,
  specialization: string,
  date: string
}
