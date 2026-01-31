import { Component, inject } from '@angular/core';
import { FieldTypes } from '../../services/field-types';
import { FieldButton } from "./field-button/field-button";
import { CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-elements-menu',
  imports: [FieldButton, CdkDropList],
  template: `
    <div class="p-4 bg-white rounded-lg h-[calc(100vh-150px)] overflow-y-auto border-gray-200 shadow-sm">
      <h3 class="text-xl font-medium mb-4">Form Elements</h3>
      <div class="flex flex-col gap-2 elements-menu" 
        cdkDropList
        cdkDropListSortingDisabled="true"
        cdkDropListData="field-selector"
      >
        @for (item of fieldTypes; track item.type) {
          <app-field-button [field]="item"/>
        }
      </div>        
    </div>
  `,
  styles: ``,
})
export class FormElementsMenu {

  fieldTypesService = inject(FieldTypes);

  fieldTypes = this.fieldTypesService.getAllFieldTypes();
}
