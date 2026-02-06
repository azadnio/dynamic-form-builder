import { Component, input, signal } from '@angular/core';
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
      (cdkDragStarted)="isDaragging.set(true)"
      (cdkDragEnded)="isDaragging.set(false)"
      class="w-full flex items-center gap-2 p-2 mb-2 rounded-lg border border-gray-200 hover:border-primary hover:bg-surface-variant hover:shadow-sm cursor-pointer transition-shadow"
      type="button"
    >
      <div class="bg-primary-container rounded-md p-1 flex items-center justify-center">
        <mat-icon aria-hidden="true" class="text-primary! scale-75">{{ field().icon }}</mat-icon>
      </div>
      <span class="text-sm font-medium">{{ field().label }}</span>
      <div *cdkDragPlaceholder></div>
    </button>

    @if(isDaragging()) {
      <div class="w-full flex items-center gap-2 p-2 mb-2 rounded-lg border border-gray-200 bg-primary-container shadow-lg">
        <div class="bg-primary-container rounded-md p-1 flex items-center justify-center"> 
          <mat-icon aria-hidden="true" class="text-primary! scale-75">{{ field().icon }}</mat-icon>
        </div>
        <span class="text-sm font-medium">{{ field().label }}</span>
      </div>
    }
  `,
  styles: ``,
})
export class FieldButton {
  field = input.required<IFieldTypeDefinition>();
  isDaragging = signal(false);
}
