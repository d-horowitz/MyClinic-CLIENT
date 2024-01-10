import { Component, Input } from '@angular/core';
import { calendarDay } from '../../types';
import { CommonModule } from '@angular/common';
import { TimediffPipe } from "../../pipes/timediff.pipe";
import { DayHeightPipe } from "../../pipes/day-height.pipe";
import { DayNamePipe } from "../../pipes/day-name.pipe";
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-temp',
  standalone: true,
  imports: [CommonModule, TimediffPipe, DayHeightPipe, DayNamePipe, MatButtonModule, MatTooltipModule, MatCheckboxModule, FormsModule, ReactiveFormsModule],
  templateUrl: './temp.component.html',
  styleUrl: './temp.component.css'
})
export class TempComponent {
  @Input() day!: calendarDay;
}
