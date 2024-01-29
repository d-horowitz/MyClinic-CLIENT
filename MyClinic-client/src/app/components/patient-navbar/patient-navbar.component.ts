import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../loading/loading.component";
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-patient-navbar',
  standalone: true,
  templateUrl: './patient-navbar.component.html',
  styleUrl: './patient-navbar.component.css',
  imports: [RouterModule, MatTabsModule, CommonModule, HttpClientModule, LoadingComponent, MatTableModule]
})
export class PatientNavbarComponent {
  displayedColumns: string[] = ["Name", "ID", "Date of Birth", "Gender", "Address", "Phone", "Email"];
  patient!: singlePatient;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { };
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      p => {
        const id = p.get("id");
        this.http.get<singlePatient>(`https://localhost:7099/api/patients/${id}`)
          .subscribe({
            next: r => {
              this.patient = r;
            },
            error: (err: HttpErrorResponse) => {
              if (err.status == 404)
                alert("Patient not found.\nReturning to previous window...")
              else
                alert("An error occured.\nReturning to previous window...")
              history.back()
            }
          })
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
