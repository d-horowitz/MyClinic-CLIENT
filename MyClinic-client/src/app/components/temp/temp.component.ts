import { Component, Input, ViewEncapsulation } from '@angular/core';
import { calendarDay, calendarDayItem } from '../../types';
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
  styleUrl: './temp.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TempComponent {
  @Input() day!: calendarDay;
  event = {
    firstEvent: {
      name: "firstie",
      startDate: new Date("01/01/2020"),
      endDate: new Date("01/10/2020")
    },
    secondEvent: {
      name: "secondie",
      startDate: new Date("02/01/2020"),
      endDate: new Date("02/10/2020")
    }
  }
  getTooltip(): string {
    return `Name: ${this.event.firstEvent.name}
    Start: ${this.event.firstEvent.startDate.toLocaleString()}
    End: ${this.event.firstEvent.endDate.toLocaleString()}

    ---------------

    Name: ${this.event.secondEvent.name}
    Start: ${this.event.secondEvent.startDate.toLocaleString()}
    End: ${this.event.secondEvent.endDate.toLocaleString()}`;
  }
}
