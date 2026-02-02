import { ApplicationRef, computed, inject, Injectable, signal } from '@angular/core';
import { FormRow } from '../models/form';
import { IFormField } from '../models/field';
import { startViewTransition } from '../utils.ts/view-transition';

@Injectable({
  providedIn: 'root',
})
export class Form {

  private appRef = inject(ApplicationRef);

  private _rows = signal<FormRow[]>([]);
  private _selectedFieldId = signal<string | null>(null);
  public readonly rows = this._rows.asReadonly();
  public readonly selectedField = computed(() =>
    this._rows()
      .flatMap(row => row.fields)
      .find(field => field.id === this._selectedFieldId())
  );

  constructor() {
    this._rows.set([{
      id: crypto.randomUUID(),
      fields: []
    }]);
  }

  addField(field: IFormField, rowId: string, index?: number) {

    this.setSelectedField(field.id);

    const updateRows = this._rows().map(row => {
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

    startViewTransition(() => {
      this._rows.set(updateRows);
    });

    // this._rows.update(rows => {
    //   return rows.map(row => {
    //     if (row.id === rowId) {
    //       const newFields = [...row.fields];
    //       newFields.splice(index ?? newFields.length, 0, field);
    //       return {
    //         ...row,
    //         fields: newFields
    //       };
    //     }
    //     return row;
    //   });
    // });
  }

  deleteField(fieldId: string) {

    const updateRows = this._rows().map(row => {
      return {
        ...row,
        fields: row.fields.filter(field => field.id !== fieldId)
      };
    });

    startViewTransition(() => {
      this._rows.set(updateRows);
      this.appRef.tick(); // Force UI update, MAY WORKS WITHOUT IT
    });

    // this._rows.update(rows => {
    //   return rows.map(row => {
    //     return {
    //       ...row,
    //       fields: row.fields.filter(field => field.id !== fieldId)
    //     };
    //   });
    // });
  }

  setSelectedField(fieldId: string) {
    this._selectedFieldId.set(fieldId);
  }

  addRow() {

    const newRow: FormRow = {
      id: crypto.randomUUID(),
      fields: []
    };

    startViewTransition(() => {
      this._rows.update(rows => [...rows, newRow]);
    });

    // this._rows.update(rows => {
    //   return [...rows, {
    //     id: crypto.randomUUID(),
    //     fields: []
    //   }];
    // });
  }

  deleteRow(rowId: string) {
    
    const updateRows = this._rows().filter(row => row.id !== rowId);

    startViewTransition(() => {
      this._rows.set(updateRows);
      this.appRef.tick(); // Force UI update, MAY WORKS WITHOUT IT
    });
  }

  moveRowUp(rowId: string) {
    const updateRows = this._rows();
    const index = updateRows.findIndex(r => r.id === rowId);

    if (index > 0) {
      const newRows = [...updateRows];
      const temp = newRows[index - 1];
      newRows[index - 1] = newRows[index];
      newRows[index] = temp;

      startViewTransition(() => {
        this._rows.set(newRows);
      });
    }

    // this._rows.update(rows => {
    //   const index = rows.findIndex(r => r.id === rowId);
    //   if (index > 0) {
    //     const newRows = [...rows];
    //     const temp = newRows[index - 1];
    //     newRows[index - 1] = newRows[index];
    //     newRows[index] = temp;
    //     return newRows;
    //   }
    //   return rows;
    // });
  }

  moveRowDown(rowId: string) {
    const updateRows = this._rows();
    const index = updateRows.findIndex(r => r.id === rowId);
    if (index >= 0 && index < updateRows.length - 1) {
      const newRows = [...updateRows];
      const temp = newRows[index + 1];
      newRows[index + 1] = newRows[index];
      newRows[index] = temp;
      startViewTransition(() => {
        this._rows.set(newRows);
      });
    }
    // this._rows.update(rows => {
    //   const index = rows.findIndex(r => r.id === rowId);
    //   if (index >= 0 && index < rows.length - 1) {
    //     const newRows = [...rows];
    //     const temp = newRows[index + 1];
    //     newRows[index + 1] = newRows[index];
    //     newRows[index] = temp;
    //     return newRows;
    //   }
    //   return rows;
    // });
  }

  moveField(fieldId: string, sourceRowId: string, toRowId: string, toIndex: number = -1) {

    const rows = this._rows();
    let fieldToMove: IFormField | undefined = undefined;
    let sourceRowIndex = -1;
    let sourceFieldIndex = -1;

    rows.forEach((row, rIndex) => {
      if (row.id === sourceRowId) {
        sourceRowIndex = rIndex;
        sourceFieldIndex = row.fields.findIndex(f => f.id === fieldId);
        if (sourceFieldIndex >= 0) {
          fieldToMove = row.fields[sourceFieldIndex];
        }
      }
    });

    if (!fieldToMove) {
      return;
    }

    const updateRows = rows.map((row, rIndex) => {

      // Remove from source row
      if (row.id === sourceRowId) {
        const newFields = row.fields.filter(f => f.id !== fieldId);
        row = { ...row, fields: newFields };
      }
      // Add to target row
      if (row.id === toRowId) {
        const newFields = [...row.fields];
        newFields.splice(toIndex >= 0 ? toIndex : newFields.length, 0, fieldToMove!);
        return {
          ...row,
          fields: newFields
        };
      }
      return row;
    });

    startViewTransition(() => {
      this._rows.set(updateRows);
      this.appRef.tick(); // Force UI update, MAY WORKS WITHOUT IT
    });

    // this._rows.update(rows => {
    //   return rows.map(row => {

    //     // Remove from source row
    //     if (row.id === sourceRowId) {
    //       const newFields = row.fields.filter(f => f.id !== fieldId);
    //       row = { ...row, fields: newFields };
    //     }
    //     // Add to target row
    //     if (row.id === toRowId) {
    //       const newFields = [...row.fields];
    //       newFields.splice(toIndex >= 0 ? toIndex : newFields.length, 0, fieldToMove!);
    //       return {
    //         ...row,
    //         fields: newFields
    //       };
    //     }
    //     return row;
    //   });
    // });
  }

  updateField(fieldId: string, data: Partial<IFormField>) {
    this._rows.update(rows => {
      return rows.map(row => {
        return {
          ...row,
          fields: row.fields.map(field => {
            return (field.id === fieldId) ? { ...field, ...data } : field
          })
        };
      });
    });
  }
}