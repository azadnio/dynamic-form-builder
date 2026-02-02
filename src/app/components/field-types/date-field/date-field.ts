import { Component, input } from '@angular/core';
import { IFormField } from '../../../models/field';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-date-field',
  imports: [MatFormField, MatDatepickerModule, MatNativeDateModule, MatInput, MatLabel, MatDatepickerToggle, MatSuffix],
  template: `
    <mat-form-field class="w-full">
      <mat-label>{{ field().label }}</mat-label>
      <input matInput [matDatepicker]="picker" [required]="field().required" />
      <mat-datepicker-toggle matSuffix [for]="picker" class="color-primary!"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
  `,
  styles: ``,
})
export class DateField {
  field = input.required<IFormField>();
}
