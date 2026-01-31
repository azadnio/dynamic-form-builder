import { Component, input } from '@angular/core';
import { IFormField } from '../../../models/field';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-text-field',
  imports: [MatFormField, MatLabel, MatInput],
  template: `
    <mat-form-field class="w-full">
      <mat-label>{{field().label}}</mat-label>
      <input matInput [type]="field().inputType || 'text'" [required]="field().required" [placeholder]="field().placeholder || ''" />
    </mat-form-field>
  `,
  styles: ``,
})
export class TextField {
  field = input.required<IFormField>()
}
