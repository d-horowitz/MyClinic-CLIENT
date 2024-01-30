import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoadingComponent } from "../loading/loading.component";
import { WeeklyCalendarComponent } from "../weekly-calendar/weekly-calendar.component";
import { calendarDay, calendarDayItem, patientDay, setToSunday } from '../../types';
import { range } from 'rxjs';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { DateAddPipe } from '../../pipes/date-add.pipe';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-patient',
  standalone: true,
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css',
  imports: [HttpClientModule, CommonModule, RouterModule, LoadingComponent, WeeklyCalendarComponent,
    DateAddPipe,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    // MatFormFieldModule,
    // MatInputModule
  ],
  providers: [DatePipe, DateAddPipe]
})
export class PatientComponent implements OnInit {
  patientDays!: patientDay[];
  date = setToSunday(new Date());
  calendarDays: calendarDay[] = [];
  constructor(private http: HttpClient, private route: ActivatedRoute, private datePipe: DatePipe, private dateAdd: DateAddPipe) { };
  ngOnInit(): void {
    this.updateDate();
  }
  updateDate() {
    this.route.parent?.paramMap.subscribe(
      p => {
        const id = p.get("id");
        this.http.get<patientDay[]>(`https://localhost:7099/api/Appointments/patient/${id}/from/${this.datePipe.transform(this.date, "yyyy-MM-dd")}`)
          .subscribe(
            r => {
              this.patientDays = r;
              this.setSchedule();
            }
          )
      }
    );
  }
  datechange(e: MatDatepickerInputEvent<any, any>) {
    this.date = setToSunday(new Date(e.value));
    this.updateDate();
  }

  before() {
    this.date = this.dateAdd.transform(this.date, -7); //tempDate;
    this.updateDate();
  }
  next() {
    this.date = this.dateAdd.transform(this.date, 7); //tempDate;
    this.updateDate();
  }
  setSchedule(): void {
    // const schedule: calendarDay[] = [];
    // range(0, 6).forEach(element => {
    //   const cd: calendarDay = { date: undefined, dayOfWeek: element, items: [] };
    //   this.patientDay.appointments.forEach(ap => {
    //     if (new Date(this.patientDay.date).getDay() == element) {
    //       cd.items.push({ id: ap.id, tooltip: `Doctor: ${ap.doctor}\nSpecialization: ${ap.specialization}`, text: '', begin: ap.begin, end: ap.end })
    //     }
    //   })
    //   schedule.push(cd);
    // }
    // );
    //return schedule;
    this.calendarDays = this.patientDays.map(pd => {
      const cd: calendarDay = {
        date: pd.date.toString(),
        dayOfWeek: new Date(pd.date).getDay(),
        items: pd.appointments.map(app => {
          const cdi: calendarDayItem = {
            id: app.id,
            begin: app.begin,
            end: app.end,
            text: '',
            tooltip: `Doctor: ${app.doctor}\nSpecialization: ${app.specialization}`
          }
          return cdi;
        })
      };
      return cd;
    })
  }
}
// type singlePatient = {
//   id: number,
//   name: string,
//   gender: string,
//   dateOfBirth: string,
//   address: string,
//   email: string,
//   phone: string,
//   appointments: appointment[]
// }
// type appointment = {
//   id: number,
//   patientId: number,
//   subject: string,
//   description: string,
//   createdDate: string,
//   cancelledDate: string,
//   begin: string,
//   end: string,
//   workDayId: number,
//   doctorId: number,
//   doctorName: string,
//   specialization: string,
//   date: string
// }
