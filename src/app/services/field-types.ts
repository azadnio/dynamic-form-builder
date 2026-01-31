import { Injectable } from '@angular/core';
import { IFieldTypeDefinition } from '../models/field';
import { TextField } from '../components/field-types/text-field/text-field';
import { CheckboxField } from '../components/field-types/checkbox-field/checkbox-field';

const TEXT_FIELD_DEFINITION = {
  type: 'text',
  label: 'Text Field',
  icon: 'text_fields',
  defaultConfig: {
    label: 'Text Field',
    required: false
  },
  component: TextField
};

const CHECKBOX_FIELD_DEFINITION = {
  type: 'checkbox',
  label: 'Checkbox',
  icon: 'check_box',
  defaultConfig: {
    label: 'Checkbox',
    required: false
  },
  component: CheckboxField
};

@Injectable({
  providedIn: 'root',
})
export class FieldTypes {
  
  private fieldTypes = new Map<string, IFieldTypeDefinition>([
    [TEXT_FIELD_DEFINITION.type, TEXT_FIELD_DEFINITION],
    [CHECKBOX_FIELD_DEFINITION.type, CHECKBOX_FIELD_DEFINITION],
  ]);

  getFieldType(type: string): IFieldTypeDefinition | undefined {
    return this.fieldTypes.get(type);
  }

  getAllFieldTypes(): IFieldTypeDefinition[] {
    return Array.from(this.fieldTypes.values());
  }
}
