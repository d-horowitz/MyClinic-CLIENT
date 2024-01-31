import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-make-appointment',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './make-appointment.component.html',
  styleUrl: './make-appointment.component.css'
})
export class MakeAppointmentComponent implements OnInit {
  specializations!: specialization[];
  doctors!: doctor[] | null;
  patientId!: string | null;
  schedule!: workday[] | null;

  appForm = new FormGroup({
    specializationId: new FormControl<doctor | null>(null, Validators.required),
    doctorId: new FormControl()
  })


  constructor(private http: HttpClient, private route: ActivatedRoute) { };
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
    //alert("dsdas");
    this.doctors = null;
    this.schedule = null;
    this.appForm.controls.doctorId.setValue(null);
    this.http.get<doctor[]>(`https://localhost:7099/api/specializations/${this.appForm.value.specializationId?.id}/doctors`)
      .subscribe(
        r => {
          this.doctors = r;
        }
      )
  }
  getSchedule() {
    this.http.get<workday[]>(`https://localhost:7099/api/doctors/${this.appForm.value.doctorId}/schedule/${new Date('12/31/2022').toJSON().split("T")[0]}`)
      .subscribe(
        r => {
          this.schedule = r;
        }
      )
  }
  makeApp(a: appointment) {
    alert(a.id);
    this.http.put(`https://localhost:7099/api/appointments/${a.id}/make/${this.patientId}`, a)
      .subscribe(
        r => {
          //console.log(r);
          this.getSchedule();
        }
      );
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