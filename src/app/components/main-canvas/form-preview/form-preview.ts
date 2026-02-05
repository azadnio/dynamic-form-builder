import { Component, inject } from '@angular/core';
import { Form } from '../../../services/form';
import { FieldPreview } from "../field-preview/field-preview";

@Component({
  selector: 'app-form-preview',
  imports: [FieldPreview],
  template: `
  <div class="py-6">
    <div class="p-6 flex flex-col gap-4 shadow-md rounded-lg border border-gray-200">
      @for(row of formService.rows(); track row.id){
        <div class="flex gap-4 flex-wrap">
          @for(field of row.fields; track field.id){
            <app-field-preview class="flex-1" [field]="field"/>
          }
        </div>
      }
    </div>
  </div>
  `,
  styles: ``,
})
export class FormPreview {
  formService = inject(Form);
  hasBorder() {return true}
}
