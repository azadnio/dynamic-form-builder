import { Component, computed, inject, input } from '@angular/core';
import { IFormField } from '../../../models/field';
import { NgComponentOutlet } from '@angular/common';
import { FieldTypes } from '../../../services/field-types';

@Component({
  selector: 'app-field-preview',
  imports: [NgComponentOutlet],
  template: `    
      <ng-container [ngComponentOutlet]="fieldComponent()"[ngComponentOutletInputs]="{ field: field() }"></ng-container>
  `,
  styles: ``,
})
export class FieldPreview {

  field = input.required<IFormField>();

  fieldTypeService = inject(FieldTypes);
  fieldComponent = computed(() => {
    const fieldDef = this.fieldTypeService.getFieldType(this.field().type);
    return fieldDef ? fieldDef.component : null;
  });

}
