import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-doctor-navbar',
  standalone: true,
  imports: [RouterModule, MatTabsModule, CommonModule, HttpClientModule, LoadingComponent],
  templateUrl: './doctor-navbar.component.html',
  styleUrl: './doctor-navbar.component.css'
})
export class DoctorNavbarComponent {
  doctor!: doctor;
  constructor(private http: HttpClient, private route: ActivatedRoute) { };
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      p => {
        const id = p.get("id");
        this.http.get<doctor>(`https://localhost:7099/api/doctors/${id}`)
          .subscribe(
            r => {
              this.doctor = r;
              //console.log(r);
            }
          )
      }
    );
  }
}
type doctor = {
  id: number,
  name: string,
  specialization: string,
  workWeekDays: any[]
}

