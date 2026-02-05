import { Component, input } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { IFormField } from '../../../models/field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-textarea',
  imports: [MatFormField, MatLabel, MatInput],
  template: `
    <mat-form-field class="w-full">
      <mat-label>{{ field().label }}</mat-label>
      <textarea matInput [required]="field().required" [placeholder]="field().placeholder || ''"></textarea>
    </mat-form-field>
  `,
  styles: ``,
})
export class Textarea {
  field = input.required<IFormField>()
}
