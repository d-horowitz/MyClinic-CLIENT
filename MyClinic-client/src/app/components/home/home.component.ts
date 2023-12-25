import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, RouterModule, MatRippleModule, MatButtonModule, MatTabsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
