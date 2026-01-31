import { Component, inject, input } from '@angular/core';
import { IFormField } from '../../../models/field';
import {  TitleCasePipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Form } from '../../../services/form';
import { FieldPreview } from "../field-preview/field-preview";

@Component({
  selector: 'app-form-field',
  imports: [TitleCasePipe, MatIconButton, MatIcon, FieldPreview],
  template: `
    <div class="bg-white p-4 pt-1 rounded-lg shadow-sm border border-gray-200 hover:border-black cursor-pointer"
      [class]="formService.selectedField()?.id === field().id ? 'border-black! shadow-md' : ''"
      (click)="formService.setSelectedField(field().id)"
      >
      <div class="flex items-center justify-between mb-1">
        <span class="text-small">{{ field().type | titlecase }}</span>
        <button mat-icon-button (click)="deleteField($event)">
          <mat-icon class="-mr-2">delete</mat-icon>
        </button>
      </div>
      <app-field-preview [field]="field()"/>
    </div>
  `,
  styles: ``,
})
export class FormField {

  formService = inject(Form);

  field = input.required<IFormField>()
  
  deleteField(e: Event) {
    e.stopPropagation();
    this.formService.deleteField(this.field().id);
  }
}
