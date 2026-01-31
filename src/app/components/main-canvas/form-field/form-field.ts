import { Component, computed, inject, input } from '@angular/core';
import { IFormField } from '../../../models/field';
import { NgComponentOutlet, TitleCasePipe } from '@angular/common';
import { FieldTypes } from '../../../services/field-types';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Form } from '../../../services/form';

@Component({
  selector: 'app-form-field',
  imports: [NgComponentOutlet, TitleCasePipe, MatIconButton, MatIcon],
  template: `
    <div class="bg-white p-4 pt-1 rounded-lg shadow-sm border border-gray-200 hover:border-black cursor-pointer">
      <div class="flex items-center justify-between mb-1">
        <span class="text-small">{{ field().type | titlecase }}</span>
        <button mat-icon-button (click)="deleteField($event)">
          <mat-icon class="-mr-2">delete</mat-icon>
        </button>
      </div>
      <ng-container [ngComponentOutlet]="fieldComponent()"[ngComponentOutletInputs]="{ field: field() }"></ng-container>
    </div>
  `,
  styles: ``,
})
export class FormField {

  fieldTypeService = inject(FieldTypes);
  formService = inject(Form);

  field = input.required<IFormField>()
  fieldComponent = computed(() => {
    const fieldDef = this.fieldTypeService.getFieldType(this.field().type);
    return fieldDef ? fieldDef.component : null;
  });

  deleteField(e: Event) {
    e.stopPropagation();
    this.formService.deleteField(this.field().id);
  }
}
