import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoadingComponent } from "../loading/loading.component";
import { MatTableModule } from "@angular/material/table";
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-view-patients',
  standalone: true,
  templateUrl: './view-patients.component.html',
  styleUrl: './view-patients.component.css',
  imports: [
    MatIconModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    LoadingComponent,
    MatTableModule,
    MatRippleModule
  ]
})
export class ViewPatientsComponent implements OnInit {
  displayedColumns: string[] = ["Name", "ID", "Date of Birth", "Gender", "Address", "Phone", "Email"];
  patients!: patient[];
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    this.http.get<patient[]>("https://localhost:7099/api/patients")
      .subscribe(
        r => {
          this.patients = r;
          //console.log(this.patients);
        }
      );
  }
  goToPatient(row: patient) {
    //alert("hi");
    this.router.navigate(['/patients/', row.id]);
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