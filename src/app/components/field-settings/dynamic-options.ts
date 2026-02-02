import { Component, input, output } from '@angular/core';
import { IOptionItem } from '../../models/field';
import { MatIcon } from "@angular/material/icon";
import { MatFormField } from "@angular/material/form-field";
import { FormsModule } from '@angular/forms';
import { MatIconButton } from "@angular/material/button";
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-dynamic-options',
  imports: [MatIcon, MatFormField, FormsModule, MatIconButton, MatInput],
  template: `
    <div>
      <div class="flex items-center justify-between">
        <h3 class="font-medium text-gray-700">{{ title() }}</h3>
        <button mat-icon-button (click)="addOptions()">
          <mat-icon>add_circle</mat-icon>
        </button>
      </div>
      <div class="flex flex-col gap-2 mb-4 mt-2">
        @for(option of options(); track option.value; let i = $index) {
          <div class="flex items-center ">
            <mat-form-field class="flex-1 compact select">
              <input matInput placeholder="Option Label" [(ngModel)]="option.label" (ngModelChange)="updateOption(i, $event)"/>
            </mat-form-field>
            <button mat-icon-button (click)="removeOption(i)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class DynamicOptions {
  title = input('');
  options = input.required<IOptionItem[]>();
  optionsChange = output<IOptionItem[]>();

  addOptions(){
    const newOption: IOptionItem = { label: `Option ${this.options().length + 1}`, value: `option${this.options().length + 1}` };
    const updatedOptions = [...this.options(), newOption];
    this.optionsChange.emit(updatedOptions);
  }

  updateOption(index: number, newLabel: string){
    const updatedOptions = this.options().map((option, i) => 
      i === index ? { ...option, label: newLabel } : option
    );
    this.optionsChange.emit(updatedOptions);
  }

  removeOption(index: number){
    const updatedOptions = this.options().filter((_, i) => i !== index);
    this.optionsChange.emit(updatedOptions);
  }
}
