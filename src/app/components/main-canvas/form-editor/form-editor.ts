import { Component, effect, inject } from '@angular/core';
import { CdkDragDrop, CdkDropList } from "@angular/cdk/drag-drop";
import { Form } from '../../../services/form';
import { IFormField } from '../../../models/field';
import { FormField } from '../form-field/form-field';

@Component({
  selector: 'app-form-editor',
  imports: [CdkDropList, FormField],
  template: `

    <div class="p-4">
      @for(row of formService.rows(); track row.id) {        
        <div 
          cdkDropList
          (cdkDropListDropped)="onDrop($event, row.id)"
          [cdkDropListOrientation]="'mixed'"
          class="p-5 bg-white rounded-lg border-2 border-dashed border-gray-200"
        >
          <div>Row</div>
          <div class="flex gap-4 flex-wrap">
            @for(field of row.fields; track field.id) {
              <app-form-field [field]="field" class="flex-1"/>              
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

  onDrop(event: CdkDragDrop<string>, id: string) {
    if (event.previousContainer.data === 'field-selector') {

      const newField: IFormField = {
        id: crypto.randomUUID(),
        type: event.item.data.type,
        label: event.item.data.label,
        ...event.item.data.defaultConfig,
      };
      this.formService.addField(newField, id, event.currentIndex);
    }
  }
}
