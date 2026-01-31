import { Injectable, signal } from '@angular/core';
import { FormRow } from '../models/form';
import { IFormField } from '../models/field';

@Injectable({
  providedIn: 'root',
})
export class Form {

  private _rows = signal<FormRow[]>([]);

  public readonly rows = this._rows.asReadonly();

  constructor() {
    this._rows.set([{
      id: crypto.randomUUID(),
      fields: []
    }]);
  }

  addField(field: IFormField, rowId: string, index?: number) {

    this._rows.update(rows => {
      return rows.map(row => {
        if (row.id === rowId) {
          const newFields = [...row.fields];
          newFields.splice(index ?? newFields.length, 0, field);
          return {
            ...row,
            fields: newFields
          };
        }
        return row;
      });
    });
  }

  deleteField(fieldId: string) {
    this._rows.update(rows => {
      return rows.map(row => {
        return {
          ...row,
          fields: row.fields.filter(field => field.id !== fieldId)
        };
      });
    });
  }
}