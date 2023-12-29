import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../loading/loading.component";

@Component({
    selector: 'app-patient-navbar',
    standalone: true,
    templateUrl: './patient-navbar.component.html',
    styleUrl: './patient-navbar.component.css',
    imports: [RouterModule, MatTabsModule, CommonModule, HttpClientModule, LoadingComponent]
})
export class PatientNavbarComponent {
  patient!: singlePatient;
  constructor(private http: HttpClient, private route: ActivatedRoute) { };
  ngOnInit(): void {
    this.route.paramMap.subscribe(
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
}
type singlePatient = {
  id: number,
  name: string,
  gender: string,
  dateOfBirth: string,
  address: string,
  email: string,
  phone: string,
  appointments: any[]
}
