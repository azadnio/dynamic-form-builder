import { inject, Injectable } from '@angular/core';
import { Form } from './form';
import { FieldTypes } from './field-types';

@Injectable({
  providedIn: 'root',
})
export class ExportForm {

  private formService = inject(Form);
  private fieldTypeService = inject(FieldTypes);

  exportForm() {
    const formCode = this.generateFormCode();
    this.download(formCode, 'dynamic-form.ts');
  }

  private download(formJson: string, filename: string) {
    const blob = new Blob([formJson], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private generateFormCode(): string {
    let code = this.generateImports();
    code += this.generateComponentDecorator();
    code += ` template: \`\n`;
    code += `    <form class="flex flex-col gap-4">\n`;

    for (const row of this.formService.rows()) {
      if (row.fields.length > 0) {
        code += `      <div class="flex gap-4 flex-wrap">\n`;
        for (const field of row.fields) {
          const fieldType = this.fieldTypeService.getFieldType(field.type);
          if (fieldType) {
            code += `        <div class="flex-1">\n`;
            code += `          ${fieldType.generateCode(field)}\n`;
            code += `        </div>\n`;
          }
        }
        code += `      </div>\n`;
      }
    }

    code += `    </form>\n`;
    code += `  \`,\n`;
    code += `  styles: [\`\`]\n`;
    code += `})\n`;
    code += `export class DynamicForm {}\n`;

    return code;
  }

  private generateImports(): string {
    return (
      `import { Component } from '@angular/core';\n` +
      `import { CommonModule } from '@angular/common';\n` +
      `import { FormsModule, ReactiveFormsModule } from '@angular/forms';\n\n` +
      `import { MatFormFieldModule } from '@angular/material/form-field';\n` +
      `import { MatInputModule } from '@angular/material/input';\n` +
      `import { MatSelectModule } from '@angular/material/select';\n` +
      `import { MatCheckboxModule } from '@angular/material/checkbox';\n` +
      `import { MatRadioModule } from '@angular/material/radio';\n` +
      `import { MatButtonModule } from '@angular/material/button';\n` +
      `import { MatDatepickerModule } from '@angular/material/datepicker';\n` +
      `import { MatNativeDateModule } from '@angular/material/core';\n\n`
    );
  }

  private generateComponentDecorator(): string {
    return (
      `@Component({\n` +
      `  selector: 'app-dynamic-form',\n` +
      `  standalone: true,\n` +
      `  imports: [\n` +
      `    CommonModule,\n` +
      `    FormsModule,\n` +
      `    ReactiveFormsModule,\n` +
      `    MatFormFieldModule,\n` +
      `    MatInputModule,\n` +
      `    MatSelectModule,\n` +
      `    MatCheckboxModule,\n` +
      `    MatRadioModule,\n` +
      `    MatButtonModule,\n` +
      `    MatDatepickerModule,\n` +
      `    MatNativeDateModule\n` +
      `  ],\n`
    );
  }
}
