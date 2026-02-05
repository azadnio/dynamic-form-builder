import { Injectable } from '@angular/core';
import { IFieldTypeDefinition, IFormField } from '../models/field';
import { TextField } from '../components/field-types/text-field/text-field';
import { CheckboxField } from '../components/field-types/checkbox-field/checkbox-field';
import { SelectField } from '../components/field-types/select-field/select-field';
import { DateField } from '../components/field-types/date-field/date-field';
import { Textarea } from '../components/field-types/textarea/textarea';
import { RadioGroup } from '../components/field-types/radio-group/radio-group';
import { Heading } from '../components/field-types/heading/heading';
import { ButtonGroup } from '../components/field-types/button-group/button-group';
import { HorizontalLine } from '../components/field-types/horizontal-line/horizontal-line';

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

const TEXTAREA_FIELD_DEFINITION: IFieldTypeDefinition = {
  type: 'textarea',
  label: 'Textarea',
  icon: 'notes',
  defaultConfig: {
    label: 'Textarea',
    required: false,
    placeholder: ''
  },
  settingsConfig: [
    { type: 'text', label: 'Label', key: 'label' },
    { type: 'text', label: 'Placeholder', key: 'placeholder' },
    { type: 'checkbox', label: 'Required', key: 'required' },
  ],
  component: Textarea,
  generateCode: (field: IFormField) => 
    `<mat-form-field class="w-full" appearance="outline">\n` +
    `   <mat-label>${field.label}</mat-label>\n` +
    `   <textarea matInput placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''}></textarea>\n` +
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

const RADIO_GROUP_FIELD_DEFINITION: IFieldTypeDefinition = {
  type: 'radio',
  label: 'Radio Group',
  icon: 'radio_button_checked',
  defaultConfig: {
    label: 'Radio Group',
    required: false,
    orientation: 'horizontal',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ]
  },
  settingsConfig: [
    { type: 'text', label: 'Label', key: 'label' },
    { type: 'checkbox', label: 'Required', key: 'required' },
    { type: 'dynamic-options', label: 'Radio Options', key: 'options' },
    { type: 'select', label: 'Orientation', key: 'orientation', 
      options: [
        { label: 'Vertical', value: 'vertical' },
        { label: 'Horizontal', value: 'horizontal' },
      ]
    },
  ],
  component: RadioGroup,
  generateCode: (field: IFormField) => {
    let code = `<mat-label>${field.label}${field.required ? ' *' : ''}</mat-label>\n` +
               `<mat-radio-group>\n` +
               `  <div class="${field.orientation === 'vertical' ? 'flex flex-col' : 'flex flex-row'}">\n`;
    if (field.options) {
      for (const option of field.options) {
        code += `    <mat-radio-button value="${option.value}">${option.label}</mat-radio-button>\n`;
      }
    }
    code += `  </div>\n</mat-radio-group>`;
    return code;
  }
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

const HEADING_FIELD_DEFINITION: IFieldTypeDefinition = {
  type: 'header',
  label: 'Header',
  icon: 'title',
  defaultConfig: {
    sectionHeading: 'Section Heading',
    sectionDescription: 'section description',
  },
  settingsConfig: [
    { type: 'text', label: 'Label', key: 'sectionHeading' },
    { type: 'text', label: 'Description', key: 'sectionDescription' },
  ],
  component: Heading,
  generateCode: (field: IFormField) => 
    `<h2 class="text-2xl">${field.sectionHeading}</h2>\n` +
    `<p class="text-gray-600 text-lg">${field.sectionDescription}</p>`

};

const BUTTON_GROUP_FIELD_DEFINITION: IFieldTypeDefinition = {
  type: 'button-group',
  label: 'Button Group',
  icon: 'smart_button',
  defaultConfig: {
    label: 'Submit',
    includeCancelButton: true,
    alignment: 'right'
  },
  settingsConfig: [
    { type: 'text', label: 'Label', key: 'label' },
    { type: 'checkbox', label: 'Include Cancel Button', key: 'includeCancelButton' },
    { type: 'select', label: 'Alignment', key: 'alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ]
    },
  ],
  component: ButtonGroup,
  generateCode: (field: IFormField) => 
    `<div class="flex gap-2 ${field.alignment === 'left' ? 'justify-start' : field.alignment === 'center' ? 'justify-center' : 'justify-end'}">\n` +
    `  <button mat-flat-button type="submit">Submit</button>\n` +
    `  ${field.includeCancelButton ? `<button type="button">Cancel</button>\n` : ''}` +
    `</div>`
};

const HORIZONTAL_LINE_FIELD_DEFINITION: IFieldTypeDefinition = {
  type: 'horizontal-line',
  label: 'Horizontal Line',
  icon: 'horizontal_rule',
  defaultConfig: {
    value: 4
  },
  settingsConfig: [
    { type: 'select', label: 'Spacing', key: 'value',
      options: [
        { label: 'None', value: '0' },
        { label: 'Extra Small', value: '1' },
        { label: 'Small', value: '2' },
        { label: 'Medium', value: '4' },
        { label: 'Large', value: '6' },
      ]
    },
  ],
  component: HorizontalLine,
  generateCode: (field: IFormField) => 
    `<hr class="border-t border-gray-300 my-4"/>`
};

@Injectable({
  providedIn: 'root',
})
export class FieldTypes {
  
  private fieldTypes = new Map<string, IFieldTypeDefinition>([
    [TEXT_FIELD_DEFINITION.type, TEXT_FIELD_DEFINITION],
    [TEXTAREA_FIELD_DEFINITION.type, TEXTAREA_FIELD_DEFINITION],
    [CHECKBOX_FIELD_DEFINITION.type, CHECKBOX_FIELD_DEFINITION],
    [RADIO_GROUP_FIELD_DEFINITION.type, RADIO_GROUP_FIELD_DEFINITION],
    [SELECT_FIELD_DEFINITION.type, SELECT_FIELD_DEFINITION],
    [DATE_FIELD_DEFINITION.type, DATE_FIELD_DEFINITION],
    [HEADING_FIELD_DEFINITION.type, HEADING_FIELD_DEFINITION],
    [BUTTON_GROUP_FIELD_DEFINITION.type, BUTTON_GROUP_FIELD_DEFINITION],
    [HORIZONTAL_LINE_FIELD_DEFINITION.type, HORIZONTAL_LINE_FIELD_DEFINITION],
  ]);

  getFieldType(type: string): IFieldTypeDefinition | undefined {
    return this.fieldTypes.get(type);
  }

  getAllFieldTypes(): IFieldTypeDefinition[] {
    return Array.from(this.fieldTypes.values());
  }

}
