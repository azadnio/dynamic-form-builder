import { Component, input } from '@angular/core';
import { IFieldTypeDefinition } from '../../../models/field';
import { MatIcon } from '@angular/material/icon';
import { CdkDrag, CdkDragPlaceholder } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-field-button',
  imports: [MatIcon, CdkDrag, CdkDragPlaceholder],
  template: `
    <button
      cdkDrag
      [cdkDragData]="field()"
      class="w-full flex items-center gap-2 p-2 mb-2 rounded-lg border border-gray-200 hover:bg-gray-50 hover:shadow-sm cursor-pointer transition-shadow"
      type="button"
    >
      <div class="bg-gray-100 rounded-md p-1 flex items-center justify-center">
        <mat-icon aria-hidden="true" >{{ field().icon }}</mat-icon>
      </div>
      <span class="text-sm font-medium">{{ field().label }}</span>
      <div *cdkDragPlaceholder></div>
    </button>
  `,
  styles: ``,
})
export class FieldButton {
  field = input.required<IFieldTypeDefinition>()
}
