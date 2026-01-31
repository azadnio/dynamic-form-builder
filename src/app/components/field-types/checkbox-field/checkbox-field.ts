import { Component, input } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { IFormField } from '../../../models/field';

@Component({
  selector: 'app-checkbox-field',
  imports: [MatCheckbox],
  template: `
    <mat-checkbox [required]="field().required">
      {{field().label}}
    </mat-checkbox>
  `,
  styles: ``,
})
export class CheckboxField {
  field = input.required<IFormField>()
}
