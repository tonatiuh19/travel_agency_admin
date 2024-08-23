import { Component } from '@angular/core';
import { DateRange } from 'igniteui-angular';

declare var $: any;

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent {
  public range: DateRange = {
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 5)),
  };
}
