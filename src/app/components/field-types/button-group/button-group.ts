import { Component, input } from '@angular/core';
import { MatAnchor, MatButton } from "@angular/material/button";
import { IFormField } from '../../../models/field';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button-group',
  imports: [MatAnchor, MatButton, NgClass],
  template: `
    <div class="flex gap-2" [ngClass]="{
      'justify-start': field().alignment === 'left',
      'justify-center': field().alignment === 'center',
      'justify-end': field().alignment === 'right',
    }">
      <button mat-flat-button type="submit">{{ field().label }}</button>
      @if(field().includeCancelButton) {
        <button type="button" mat-button>Cancel</button>
      }
    </div>
  `,
  styles: ``,
})
export class ButtonGroup {
  field = input.required<IFormField>();
}
