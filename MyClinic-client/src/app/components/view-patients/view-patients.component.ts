import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from "../loading/loading.component";

@Component({
    selector: 'app-view-patients',
    standalone: true,
    templateUrl: './view-patients.component.html',
    styleUrl: './view-patients.component.css',
    imports: [MatIconModule, HttpClientModule, CommonModule, RouterModule, LoadingComponent]
})
export class ViewPatientsComponent implements OnInit {
  patients!: patient[];
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.http.get<patient[]>("https://localhost:7099/api/patients")
      .subscribe(
        r => {
          this.patients = r;
          console.log(this.patients);
        }
      );
  }
}
type patient = {
  id: number,
  name: string,
  gender: string,
  dateOfBirth: string,
  address: string,
  email: string,
  phone: string
}