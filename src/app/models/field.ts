import { Type } from "@angular/core";

export interface IFieldTypeDefinition {
  type: string;
  label: string;
  icon: string;
  defaultConfig: any;
  component: Type<unknown>
}

export interface IFormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  inputType?: string;
}

