import { Component, computed, inject } from '@angular/core';
import { Form } from '../../services/form';
import { FieldTypes } from '../../services/field-types';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from "@angular/material/checkbox";
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { DynamicOptions } from "./dynamic-options";

@Component({
  selector: 'app-field-settings',
  imports: [MatFormField, MatLabel, MatInput, FormsModule, MatCheckbox, MatOption, MatSelect, DynamicOptions],
  template: `
    <div class="p-4 bg-surface-container-lowest rounded-lg h-[calc(100vh-150px)] overflow-y-auto border-gray-200 shadow-sm">
      @if(formsService.selectedField(); as selectedField) {
        <h3 class="text-xl font-medium mb-6 text-primary ">Field Properties</h3>
        <div class="flex flex-col gap-6">
          @for(setting of fieldSettings(); track setting.key) {

            @switch (setting.type) {
              @case('text') {
                <mat-form-field  class="w-full">
                  <mat-label>{{ setting.label }}</mat-label>
                  <input 
                    matInput 
                    [ngModel]="fieldValues()[setting.key]" 
                    (ngModelChange)="updateField(selectedField.id, setting.key, $event)" 
                  />
                </mat-form-field>
              }
              @case('checkbox') {
                <div class="flex flex-items">
                  <mat-checkbox
                    [ngModel]="fieldValues()[setting.key]" 
                    (ngModelChange)="updateField(selectedField.id, setting.key, $event)" 
                  >
                    {{ setting.label }}
                  </mat-checkbox>
                </div>
              }
              @case('select') {
                <mat-form-field class="w-full">
                  <mat-label>{{ setting.label }}</mat-label>
                  <mat-select [(ngModel)]="fieldValues()[setting.key]" >
                    @for(option of setting.options; track option.value) {
                      <mat-option 
                        [value]="option.value">
                        {{ option.label }}
                      </mat-option>
                    }
                  </mat-select>
                </mat-form-field>
              }
              @case('dynamic-options') {
                <app-dynamic-options 
                  [options]="fieldValues()[setting.key]" 
                  (optionsChange)="updateField(selectedField.id, setting.key, $event)"
                  [title]="setting.label"
                />
              }
            }
          }
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class FieldSettings {
  formsService = inject(Form);
  fieldTypeService = inject(FieldTypes);

  fieldSettings = computed(() => {
    const selectedField = this.formsService.selectedField();
    if (!selectedField) {
      return [];
    }

    return this.fieldTypeService.getFieldType(selectedField.type)?.settingsConfig || [];
  });

  fieldValues = computed(() => {
    const selectedField = this.formsService.selectedField();
    return selectedField ? selectedField as any : {};
  });

  updateField(fieldId: string, key: string, value: any) {
    this.formsService.updateField(fieldId, { [key]: value });
  }
}
