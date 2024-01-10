import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { ThemePalette } from '@angular/material/core';
import { LoadingComponent } from "../loading/loading.component";

import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [MatIconModule, RouterModule, MatRippleModule, MatButtonModule, MatTabsModule, MatCardModule, LoadingComponent
    ,
    MatTooltipModule
  ]
})
export class HomeComponent {
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }
}
