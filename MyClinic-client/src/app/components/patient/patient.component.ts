import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoadingComponent } from "../loading/loading.component";
import { WeeklyCalendarComponent } from "../weekly-calendar/weekly-calendar.component";
import { calendarDay, calendarDayItem, appointmentsDay, setToSunday } from '../../types';
import { range } from 'rxjs';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { DateAddPipe } from '../../pipes/date-add.pipe';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
  patientDays!: appointmentsDay[];
  date = setToSunday(new Date());
  calendarDays: calendarDay[] = [];
  constructor(private http: HttpClient, private route: ActivatedRoute, private datePipe: DatePipe, private dateAdd: DateAddPipe, public dialog: MatDialog,) { };
  ngOnInit(): void {
    this.updateDate();
  }

  displayAppointment(appId: number) {
    const day = this.patientDays.filter(
      cd => cd.appointments.filter(
        ap => ap.id == appId).length == 1
    )[0];
    const appiontment = day.appointments.filter(
      ap => ap.id == appId
    )[0];
    const message = `${this.datePipe.transform(day.date, "EEEE, dd/MM/yyyy")}
${appiontment.begin} - ${appiontment.end}
${appiontment.doctor}, ${appiontment.specialization}
Created on: ${this.datePipe.transform(appiontment.createdDate, "EEEE, dd/MM/yyyy")}
    
Subject: ${appiontment.subject ?? '(No Subject)'}
Description:
${appiontment.description ?? '(No Description)'}`

    //const message = `info about app: ${appId}`
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Appointment info',
        body: message,
        okText: 'Cancel this appointment',
        cancelText: 'Close'
      }
    })
  }

  updateDate() {
    this.route.parent?.paramMap.subscribe(
      p => {
        const id = p.get("id");
        this.http.get<appointmentsDay[]>(`https://localhost:7099/api/Appointments/patient/${id}/from/${this.datePipe.transform(this.date, "yyyy-MM-dd")}`)
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
        date: pd.date,
        dayOfWeek: pd.dayOfWeek,
        items: pd.appointments.map(app => {
          const cdi: calendarDayItem = {
            id: app.id,
            begin: app.begin,
            end: app.end,
            text: '',
            tooltip: 'Show appointment info',//`Doctor: ${app.doctor}\nSpecialization: ${app.specialization}`,
            disabled: false
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
