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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  patientId!: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private dateAdd: DateAddPipe,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { };
  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(
      p => {
        this.patientId = p.get("id") ?? "";
      }
    );
    this.updateDate();
  }

  displayAppointment(appId: number) {
    const day = this.patientDays.filter(
      cd => cd.appointments.filter(
        ap => ap.id == appId).length == 1
    )[0];
    const appointment = day.appointments.filter(
      ap => ap.id == appId
    )[0];
    appointment.begin = appointment.begin.substring(0,5);
    appointment.end = appointment.end.substring(0,5);
    const message = `${this.datePipe.transform(day.date, "EEEE, dd/MM/yyyy")}
${appointment.begin} - ${appointment.end}
${appointment.doctor}, ${appointment.specialization}
Created on: ${this.datePipe.transform(appointment.createdDate, "EEEE, dd/MM/yyyy")}
    
Subject: ${appointment.subject ?? '(No Subject)'}
Description:
${appointment.description ?? '(No Description)'}`

    //const message = `info about app: ${appId}`
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Appointment info',
        body: message,
        okText: 'Cancel this appointment',
        cancelText: 'Close'
      }
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (!result) return;
        this.cancelAppointment(appId);
      }
    )
  }

  cancelAppointment(appId: number) {
    this.http.put(`https://localhost:7099/api/Appointments/${appId}/cancel`, { patientId: Number(this.patientId) })
      .subscribe({
        next: r => {
          this.snackBar.open('✔️ Appointment cancelled successfully', 'OK', {
            duration: 5000,
            verticalPosition: 'top'
          });
          this.updateDate();
        },
        error: err => {
          this.snackBar.open('❌ ERROR! Appointment was not cancelled successfully', 'OK', {
            duration: 5000,
            verticalPosition: 'top'
          });
        }
      })
  }

  updateDate() {
    this.http.get<appointmentsDay[]>(`https://localhost:7099/api/Appointments/patient/${this.patientId}/from/${this.datePipe.transform(this.date, "yyyy-MM-dd")}`)
      .subscribe(
        r => {
          this.patientDays = r;
          this.setSchedule();
        }
      )
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
            begin: app.begin.substring(0, 5),
            end: app.end.substring(0, 5),
            text: '',
            tooltip: 'Show appointment info',
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
