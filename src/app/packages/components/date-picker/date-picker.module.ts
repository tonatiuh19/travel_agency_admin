import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker.component';
import { FormsModule } from '@angular/forms';
import {
  IgxDateRangePickerModule,
  IgxInputGroupModule,
} from 'igniteui-angular';

@NgModule({
  declarations: [DatePickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    IgxDateRangePickerModule,
    IgxInputGroupModule,
  ],
  exports: [DatePickerComponent],
})
export class DatePickerModule {}
