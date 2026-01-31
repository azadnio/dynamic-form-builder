import { Component, input } from '@angular/core';
import { IFormField } from '../../../models/field';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatSelect, MatOption } from "@angular/material/select";

@Component({
  selector: 'app-select-field',
  imports: [MatFormField, MatLabel, MatSelect, MatOption, MatSelect],
  template: `
    <mat-form-field class="w-full">
      <mat-label>{{field().label}}</mat-label>
      <mat-select [required]="field().required">
        @if(field().options) {
          @for(option of field().options; track option.value) {
            <mat-option [value]="option.value">{{ option.label }}</mat-option>
          }
        }
        @else {
          <mat-option value="option1">Option 1</mat-option>
          <mat-option value="option2">Option 2</mat-option>
          <mat-option value="option3">Option 3</mat-option> 
        }
      </mat-select>

    </mat-form-field>
  `,
  styles: ``,
})
export class SelectField {
  field = input.required<IFormField>()
}
