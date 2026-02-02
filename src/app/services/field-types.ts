import { Injectable } from '@angular/core';
import { IFieldTypeDefinition, IFormField } from '../models/field';
import { TextField } from '../components/field-types/text-field/text-field';
import { CheckboxField } from '../components/field-types/checkbox-field/checkbox-field';
import { SelectField } from '../components/field-types/select-field/select-field';
import { DateField } from '../components/field-types/date-field/date-field';

const TEXT_FIELD_DEFINITION: IFieldTypeDefinition = {
  type: 'text',
  label: 'Text Field',
  icon: 'text_fields',
  defaultConfig: {
    label: 'Text Field',
    required: false
  },
  settingsConfig: [
    { type: 'text', label: 'Label', key: 'label' },
    { type: 'text', label: 'Placeholder', key: 'placeholder' },
    { type: 'checkbox', label: 'Required', key: 'required' },
    { type: 'select', label: 'Input Type', key: 'inputType', 
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Number', value: 'number' },
        { label: 'Email', value: 'email' },
        { label: 'Password', value: 'password' },
        { label: 'Phone', value: 'tel' },
      ]
    },
  ],
  component: TextField,
  generateCode: (field: IFormField) => 
    `<mat-form-field class="w-full" appearance="outline">\n` +
    `   <mat-label>${field.label}</mat-label>\n` +
    `   <input matInput type="${field.inputType || 'text'}" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''}/>\n` +
    `</mat-form-field>`
};

const CHECKBOX_FIELD_DEFINITION: IFieldTypeDefinition = {
  type: 'checkbox',
  label: 'Checkbox',
  icon: 'check_box',
  defaultConfig: {
    label: 'Checkbox',
    required: false
  },
  settingsConfig : [
    { type: 'text', label: 'Label', key: 'label' },
    { type: 'checkbox', label: 'Required', key: 'required' },
  ],
  component: CheckboxField,
  generateCode: (field: IFormField) => 
    `<mat-checkbox ${field.required ? 'required' : ''}>${field.label}</mat-checkbox>`
};

const SELECT_FIELD_DEFINITION: IFieldTypeDefinition = {
  type: 'select',
  label: 'Dropdown',
  icon: 'arrow_drop_down_circle',
  defaultConfig: {
    label: 'Select',
    required: false,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ]
  },
  settingsConfig: [
    { type: 'text', label: 'Label', key: 'label' },
    { type: 'checkbox', label: 'Required', key: 'required' },
    { type: 'dynamic-options', label: 'Dropdown Options', key: 'options' },
  ],
  component: SelectField,
  generateCode: (field: IFormField) => {
    let code = `
    <mat-form-field class="w-full" appearance="outline">
      <mat-label>${field.label}</mat-label>
      <mat-select ${field.required ? 'required' : ''}>
    `;
    if (field.options) {
      for (const option of field.options) {
        code += `<mat-option value="${option.value}">${option.label}</mat-option>\n`;
      }
    }
    code += `
      </mat-select>
    </mat-form-field>`;
    return code;
  }
};

const DATE_FIELD_DEFINITION: IFieldTypeDefinition = {
  type: 'date',
  label: 'Date Picker',
  icon: 'calendar_today',
  defaultConfig: {
    label: 'Date',
    required: false
  },
  component: DateField,
  settingsConfig: [
    { type: 'text', label: 'Label', key: 'label' },
    { type: 'checkbox', label: 'Required', key: 'required' },
  ],
  generateCode: (field: IFormField) => 
    `<mat-form-field class="w-full" appearance="outline">\n` +
    `   <mat-label>${field.label}</mat-label>\n` +
    `   <input matInput [matDatepicker]="picker${field.id}" ${field.required ? 'required' : ''}/>\n` +
    `   <mat-datepicker-toggle matSuffix [for]="picker${field.id}"></mat-datepicker-toggle>\n` +
    `   <mat-datepicker #picker${field.id}></mat-datepicker>\n` +
    `</mat-form-field>`
};

@Injectable({
  providedIn: 'root',
})
export class FieldTypes {
  
  private fieldTypes = new Map<string, IFieldTypeDefinition>([
    [TEXT_FIELD_DEFINITION.type, TEXT_FIELD_DEFINITION],
    [CHECKBOX_FIELD_DEFINITION.type, CHECKBOX_FIELD_DEFINITION],
    [SELECT_FIELD_DEFINITION.type, SELECT_FIELD_DEFINITION],
    [DATE_FIELD_DEFINITION.type, DATE_FIELD_DEFINITION],
  ]);

  getFieldType(type: string): IFieldTypeDefinition | undefined {
    return this.fieldTypes.get(type);
  }

  getAllFieldTypes(): IFieldTypeDefinition[] {
    return Array.from(this.fieldTypes.values());
  }

}
