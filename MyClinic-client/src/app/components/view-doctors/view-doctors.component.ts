import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-view-doctors',
  standalone: true,
  imports: [MatIconModule, HttpClientModule, CommonModule, RouterModule, LoadingComponent],
  templateUrl: './view-doctors.component.html',
  styleUrl: './view-doctors.component.css'
})
export class ViewDoctorsComponent {
  doctors!: doctor[];
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private http: HttpClient
  ) {
    this.matIconRegistry.addSvgIconLiteral(
      "doctor",
      this.domSanitizer.bypassSecurityTrustHtml(
        `<svg xmlns="http://www.w3.org/2000/svg" width = "48" height = "48.001" >
          <g fill="#1a171b" >
            <path d="M43.223 30.916a37 37 0 0 0-4.082-1.624 10.485 10.485 0 0 0-1.607-3.354 12.6 12.6 0 0 0-5.077-3.961 15.432 15.432 0 0 0 3.32-9.723 13.982 13.982 0 0 0-.987-5.3A11.185 11.185 0 0 0 24 0a11.186 11.186 0 0 0-10.78 6.935 13.98 13.98 0 0 0-.995 5.317A15.455 15.455 0 0 0 15.48 21.9a13.11 13.11 0 0 0-5.456 4.146 10.3 10.3 0 0 0-1.665 3.418 36.039 36.039 0 0 0-3.59 1.453A7.982 7.982 0 0 0 0 38.081v9.192a.728.728 0 0 0 1.455 0v-9.192a6.545 6.545 0 0 1 3.937-5.847c.835-.4 1.731-.768 2.673-1.118a11.185 11.185 0 0 0 .281 3.8 5.7 5.7 0 0 0-2.893 3.258 8.88 8.88 0 0 0-.109 5.687 9.495 9.495 0 0 0 1.667 3.206.727.727 0 1 0 1.133-.911 8.076 8.076 0 0 1-1.407-2.712 7.438 7.438 0 0 1 .075-4.75 4.137 4.137 0 0 1 2.6-2.634 4.132 4.132 0 0 1 3.625.767 7.426 7.426 0 0 1 2.674 3.926 8.028 8.028 0 0 1 .316 3.039.728.728 0 0 0 .656.794.736.736 0 0 0 .792-.655 9.5 9.5 0 0 0-.372-3.6 8.888 8.888 0 0 0-3.218-4.689 5.726 5.726 0 0 0-4.144-1.135 9.506 9.506 0 0 1-.141-3.929c.364-.118.729-.237 1.105-.349.91-.271 1.674-.477 2.408-.651a7.53 7.53 0 0 0 .754-.225c1.218 3.26 7.532 6.308 9.4 7.147v10.77a.728.728 0 0 0 1.455 0V36.5c1.862-.845 8.166-3.907 9.4-7.167.246.092.49.172.747.241.731.173 1.494.38 2.4.649.222.066.434.138.652.206a12.916 12.916 0 0 1-.333 5.908 4.055 4.055 0 0 0-1.289-.227 4.17 4.17 0 1 0 2.584.936 15.116 15.116 0 0 0 .6-6.095c1.1.395 2.15.818 3.117 1.274a6.555 6.555 0 0 1 3.943 5.855v9.188a.727.727 0 0 0 1.454 0v-9.185a7.991 7.991 0 0 0-4.774-7.167zM24 1.455a9.821 9.821 0 0 1 9.069 5.232c-.013 0-.014.014-.016.025a26.237 26.237 0 0 0-4.97 1.756 17.027 17.027 0 0 1-3.635 1.3c-5 .889-8.008-.9-9.7-2.7A9.8 9.8 0 0 1 24 1.455zm-10.323 10.8a13 13 0 0 1 .508-3.684c2.016 1.887 5.332 3.553 10.517 2.635A17.853 17.853 0 0 0 28.671 9.8a23.5 23.5 0 0 1 4.979-1.749 12.782 12.782 0 0 1 .673 4.2c0 6.932-4.631 12.57-10.323 12.57s-10.323-5.636-10.323-12.567zm-.9 15.912c-.759.182-1.548.395-2.483.672-.072.021-.139.045-.211.066a8.943 8.943 0 0 1 1.107-1.99 11.89 11.89 0 0 1 5.321-3.862 12.508 12.508 0 0 0 .979.882 6.026 6.026 0 0 1-3.414 3.77 7.072 7.072 0 0 1-1.297.461zM24 35.237c-3.29-1.452-8.14-4.281-8.813-6.459a7.425 7.425 0 0 0 3.551-4 10 10 0 0 0 10.533 0 7.679 7.679 0 0 0 3.548 3.96c-.668 2.182-5.526 5.032-8.819 6.499zm11.2-7.077a7.684 7.684 0 0 1-1.265-.484 6.269 6.269 0 0 1-3.417-3.747c.316-.251.614-.533.908-.819a11.39 11.39 0 0 1 4.933 3.69 8.927 8.927 0 0 1 1.072 1.962 41.27 41.27 0 0 0-2.231-.602zm3.772 12.075a2.667 2.667 0 1 1-2.672-2.667 2.669 2.669 0 0 1 2.668 2.667z" /> <circle cx="36.302" cy = "40.235" r = ".728" />
          </g>
        </svg >`
      )
    );
  }
  ngOnInit(): void {
    this.http.get<doctor[]>("https://localhost:7099/api/doctors")
      .subscribe(
        r => {
          this.doctors = r;
          console.log(this.doctors);
        }
      );
  }
}
type doctor = {
  id: number,
  name: string,
  specialization: string
}
