import { Component } from '@angular/core';
import { WeeklyCalendarComponent } from "../weekly-calendar/weekly-calendar.component";
import { calendarDay, calendarDayItem, setToSunday, workDay } from '../../types';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { range } from 'rxjs';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DateAddPipe } from "../../pipes/date-add.pipe";
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-doctor-schedule',
  standalone: true,
  templateUrl: './doctor-schedule.component.html',
  styleUrl: './doctor-schedule.component.css',
  providers: [DatePipe, DateAddPipe],
  imports: [
    CommonModule,
    WeeklyCalendarComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTooltipModule,
    DateAddPipe,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class DoctorScheduleComponent {
  workDays!: workDay[];
  date = setToSunday(new Date());
  calendarDays: calendarDay[] = [];
  constructor(private http: HttpClient, private route: ActivatedRoute, private datePipe: DatePipe, private dateAdd: DateAddPipe) { };
  ngOnInit(): void {
    this.updateDate();
  }
  datechange(e: MatDatepickerInputEvent<any, any>) {
    //alert('bye');
    //console.log(e);
    //alert(this.datePipe.transform(e.value, "EEEE, dd/MM/yyyy"));//).transform(e.value));
    this.date = setToSunday(new Date(e.value));
    this.updateDate();
  }
  
  updateDate() {
    this.route.parent?.paramMap.subscribe(
      p => {
        const id = p.get("id");
        this.http.get<workDay[]>(`https://localhost:7099/api/Doctors/${id}/schedule/${this.datePipe.transform(this.date, "yyyy-MM-dd")}`)
          .subscribe(
            r => {
              this.workDays = r;
              console.log(r);
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
        date: wd.date,
        dayOfWeek: new Date(wd.date).getDay(),
        items: wd.appointments.map(ap => {
          const item: calendarDayItem = {
            id: ap.id,
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
    const tempDate = new Date(this.date);
    range(0, 6).forEach(element => {
      if (schedule[0] && schedule[0].dayOfWeek == element)
        this.calendarDays.push(schedule.shift() ?? { date: tempDate.toString(), dayOfWeek: element, items: [] })
      else
        this.calendarDays.push({ date: tempDate.toString(), dayOfWeek: element, items: [] });
      tempDate.setDate(tempDate.getDate() + 1);
    });
  }
  before() {
    //const tempDate = new Date(this.date);
    //range(0, 7).forEach(i => tempDate.setDate(tempDate.getDate() - 1))
    //tempDate.setDate(tempDate.getDate() - 7);
    this.date = this.dateAdd.transform(this.date, -7); //tempDate;
    this.updateDate();
  }
  next() {
    //const tempDate = new Date(this.date);
    //tempDate.setDate(this.date.getDate() + 7);
    this.date = this.dateAdd.transform(this.date, 7); //tempDate;
    this.updateDate();
  }
}