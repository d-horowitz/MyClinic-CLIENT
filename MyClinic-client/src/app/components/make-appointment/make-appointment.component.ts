import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-make-appointment',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './make-appointment.component.html',
  styleUrl: './make-appointment.component.css'
})
export class MakeAppointmentComponent implements OnInit {
  specializations!: specialization[];
  doctors!: doctor[] | null;
  patientId!: string | null;
  schedule!: workday[];

  appForm = new FormGroup({
    specializationId: new FormControl(),
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
    this.doctors = null;
    this.appForm.controls.doctorId.setValue(null);
    this.http.get<doctor[]>(`https://localhost:7099/api/specializations/${this.appForm.value.specializationId}/doctors`)
      .subscribe(
        r => {
          this.doctors = r;
        }
      )
  }
  getSchedule() {
    this.http.get<workday[]>(`https://localhost:7099/api/doctors/${this.appForm.value.doctorId}/schedule/${new Date().toJSON().split("T")[0]}`)
    .subscribe(
      r=>{
        this.schedule = r;
      }
    )
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
type workday  = {
  id:number,
  date: string,
  begin: string,
  end: string,
  appointments: any[],
  doctorId: number
}