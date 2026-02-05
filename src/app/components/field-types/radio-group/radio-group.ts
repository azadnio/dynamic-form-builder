import { Component, effect, input } from '@angular/core';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { IFormField } from '../../../models/field';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-radio-group',
  imports: [MatRadioGroup, MatRadioButton, MatLabel],
  template: `
    <mat-label class="flex text-gray-700">
      {{ field().label }}
      @if(field().required){
        <span>&nbsp;*</span>
      } : 
    </mat-label>
    <mat-radio-group aria-label="Select an option">
      @if(field().options) {
        <div class="flex pt-2" [class.flex-col]="field().orientation === 'vertical'" [class.flex-row]="field().orientation === 'horizontal'">
          @for(option of field().options; track option.value) {
            <mat-radio-button class="mr-4" [value]="option.value">{{ option.label }}</mat-radio-button>
          }
        </div>
      }
    </mat-radio-group>
  `,
  styles: ``,
})
export class RadioGroup {
  field = input.required<IFormField>();
}
