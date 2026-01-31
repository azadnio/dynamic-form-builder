import { Component,  inject } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag } from "@angular/cdk/drag-drop";
import { Form } from '../../../services/form';
import { IFormField } from '../../../models/field';
import { FormField } from '../form-field/form-field';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-form-editor',
  imports: [CdkDropList, FormField, MatIcon, MatButton, CdkDrag],
  template: `

    <div class="p-4">
      @for(row of formService.rows(); track row.id) {        
        <div 
          cdkDropList
          [cdkDropListData]="row.id"
          (cdkDropListDropped)="onDrop($event, row.id)"
          [cdkDropListOrientation]="'mixed'"
          class="p-5 bg-white rounded-lg border-2 border-dashed border-gray-200 mb-4"
        >
          <div class="flex justify-between items-center">
            <span>Row</span>
            <button mat-icon-button (click)="formService.deleteRow(row.id)" class="hover:text-red-400 cursor-pointer">
              <mat-icon>close</mat-icon>
            </button>
          </div>
          <div class="flex gap-4 flex-wrap ">
            @for(field of row.fields; track field.id) {
              <app-form-field cdkDrag [cdkDragData]="field" [field]="field" class="flex-1"/>              
            } @empty {
              <div class="w-full p-4 border border-dashed border-primary-container rounded-lg text-gray-400 text-center">
                Darg and drop form elements here
              </div>
            }
          </div>
        </div>
      }

    </div>
  `,
  styles: ``,
})
export class FormEditor {

  formService = inject(Form);

  onDrop(event: CdkDragDrop<string>, rowId: string) {
    if (event.previousContainer.data === 'field-selector') {

      const newField: IFormField = {
        id: crypto.randomUUID(),
        type: event.item.data.type,
        label: event.item.data.label,
        ...event.item.data.defaultConfig,
      };
      this.formService.addField(newField, rowId, event.currentIndex);
    }

    else {
      const dragData = event.item.data as IFormField;
      const previousRowId = event.previousContainer.data as string;
      this.formService.moveField(dragData.id, previousRowId, rowId, event.currentIndex);
    }
  }
}
