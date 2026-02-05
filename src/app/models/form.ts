import { IFormField } from "./field";

export interface FormRow {
    id: string;
    fields: IFormField[];
    borderBottom: boolean;
}