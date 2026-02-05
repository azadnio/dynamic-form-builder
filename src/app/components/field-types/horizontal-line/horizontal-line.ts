import { Component, input } from '@angular/core';
import { IFormField } from '../../../models/field';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-horizontal-line',
  imports: [NgClass],
  template: `
    <hr class="border-t border-gray-300" 
    [ngClass]="{
      'my-0': field().value == '0',
      'my-1': field().value == '1',
      'my-2': field().value == '2',
      'my-4': field().value == '4',
      'my-6': field().value == '6',
    }" 
    />
  `,
  styles: ``,
})
export class HorizontalLine {
  field = input.required<IFormField>();
}
