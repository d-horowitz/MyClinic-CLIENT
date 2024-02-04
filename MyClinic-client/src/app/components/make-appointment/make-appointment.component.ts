import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WeeklyCalendarComponent } from "../weekly-calendar/weekly-calendar.component";
import { DateAddPipe } from '../../pipes/date-add.pipe';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { appointmentsDay, calendarDay, calendarDayItem, setToSunday } from '../../types';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-make-appointment',
  standalone: true,
  templateUrl: './make-appointment.component.html',
  styleUrl: './make-appointment.component.css',
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    WeeklyCalendarComponent,
    DateAddPipe,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ],
  providers: [DatePipe, DateAddPipe]
})
export class MakeAppointmentComponent implements OnInit {
  specializations: specialization[] = [];
  doctors: doctor[] = [];
  patientId!: string | null;
  schedule: appointmentsDay[] = [];
  date = setToSunday(new Date());
  today = new Date();
  calendarDays: calendarDay[] = [];

  appForm = new FormGroup({
    specialization: new FormControl<specialization | null>(null, Validators.required),
    doctor: new FormControl<doctor | null>(null, Validators.required)
  })


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
        this.patientId = p.get("id");
      }
    );
    this.http.get<specialization[]>("https://localhost:7099/api/specializations")
      .subscribe(
        r => {
          this.specializations = r;
        }
      )
  }

  getDoctors() {
    this.doctors = [];
    this.calendarDays = [];
    this.appForm.controls.doctor.setValue(null);
    this.http.get<doctor[]>(`https://localhost:7099/api/specializations/${this.appForm.value.specialization?.id}/doctors`)
      .subscribe(
        r => {
          this.doctors = r;
        }
      )
  }

  getSchedule() {
    this.http.get<appointmentsDay[]>(`https://localhost:7099/api/doctors/${this.appForm.value.doctor?.id}/schedule/${this.datePipe.transform(this.date, "yyyy-MM-dd")}`)
      .subscribe(
        r => {
          this.schedule = r;
          this.calendarDays = r.map(ad => {
            const cd: calendarDay = {
              date: ad.date,
              dayOfWeek: ad.dayOfWeek,
              items: ad.appointments.map(app => {
                const cdi: calendarDayItem = {
                  id: app.id,
                  begin: app.begin.substring(0, 5),
                  end: app.end.substring(0, 5),
                  text: '',
                  tooltip: app.patientId ? 'reserved' : '',
                  disabled: app.patientId != null
                }
                return cdi;
              })
            };
            return cd;
          })
        }
      )
  }

  datechange(e: MatDatepickerInputEvent<any, any>) {
    this.date = setToSunday(new Date(e.value));
    this.getSchedule();
  }

  before() {
    this.date = this.dateAdd.transform(this.date, -7);
    this.getSchedule();
  }

  next() {
    this.date = this.dateAdd.transform(this.date, 7);
    this.getSchedule();
  }

  makeApp(appId: number) {
    const day = this.schedule.filter(
      cd => cd.appointments.filter(
        ap => ap.id == appId).length == 1
    )[0];
    const appointment = day.appointments.filter(
      ap => ap.id == appId
    )[0];
    appointment.begin = appointment.begin.substring(0,5)
    appointment.end = appointment.end.substring(0,5)
    const message = `${this.datePipe.transform(day.date, "EEEE, dd/MM/yyyy")}
${appointment.begin} - ${appointment.end}
${appointment.doctor}, ${appointment.specialization} 
    
Are you sure you want to make this appointment?`

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Make an Appointment",
        body: message,
        cancelText: 'No',
        okText: "Yes, I want to make this appointment!"
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) return;

      this.http.put(`https://localhost:7099/api/appointments/${appId}/make/${this.patientId}`, appId)
        .subscribe(
          {
            next: r => {
              this.snackBar.open('✔️ Appointment made successfully', 'OK', {
                duration: 5000,
                verticalPosition: 'top'
              });
              this.getSchedule();
            },
            error: (err) => {
              this.snackBar.open('❌ ERROR! Appointment was not made successfully', 'OK', {
                duration: 5000,
                verticalPosition: 'top'
              })
            },
          }
        );
    });



  }
}
type specialization = {
  id: number,
  name: string
}
type doctor = {
  id: number,
  name: string,
  appointmentDuration: string,
  specialization: specialization
}
type workday = {
  id: number,
  date: string,
  begin: string,
  end: string,
  appointments: appointment[],
  doctorId: number
}
type appointment = {
  id: number,
  patientId: number,
  subject: string,
  description: string,
  createdDate: string,
  begin: string,
  end: string,
  workDayId: number
}