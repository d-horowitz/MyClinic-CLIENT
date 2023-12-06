import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-make-appointment',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './make-appointment.component.html',
  styleUrl: './make-appointment.component.css'
})
export class MakeAppointmentComponent implements OnInit {
  specializations!: specialization[];
  selectedSpec!: specialization;

  specForm = new FormGroup({
    specialization: new FormControl(),
  })


  constructor(private http: HttpClient) { };
  ngOnInit(): void {
    this.http.get<specialization[]>("https://localhost:7099/api/specializations")
      .subscribe(
        r => {
          this.specializations = r;
        }
      )
  }
}
type specialization = {
  id: number,
  name: string
}