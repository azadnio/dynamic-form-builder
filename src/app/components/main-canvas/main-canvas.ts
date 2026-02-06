import { Component, inject, signal, Signal } from '@angular/core';
import { FormEditor } from "./form-editor/form-editor";
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { FormPreview } from "./form-preview/form-preview";
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Form } from '../../services/form';

@Component({
  selector: 'app-main-canvas',
  imports: [FormEditor, MatButtonToggle, MatButtonToggleGroup, FormPreview, MatAnchor, MatIcon],
  template: `
    <div class="p-4 bg-surface-container-lowest rounded-lg h-[calc(100vh-150px)] overflow-y-auto border-gray-200 shadow-sm">
      <div class="pb-4 border-b border-gray-200 flex gap-2 items-center">
        <h3 class="text-xl font-medium text-primary">Form Canvas</h3>
        <mat-button-toggle-group [(value)]="activeTab" hideSingleSelectionIndicator="true" class="border-primary!" >
            <mat-button-toggle value="editor"> Editor </mat-button-toggle>
            <mat-button-toggle value="preview"> Preview </mat-button-toggle>
        </mat-button-toggle-group>
        @if(activeTab() === 'editor') {
          <div class="flex-1"></div>
          <button mat-flat-button (click)="formService.addRow()" class="compact-button">
            Add Row 
            <mat-icon>add_circle</mat-icon>
          </button>
        }
      </div>
      @if (activeTab() === 'editor') {
        <app-form-editor/>
      }
      @else {
        <app-form-preview/>
      }
    </div>
  `,
  styles: `
  `,
})
export class MainCanvas {
  formService = inject(Form);
  activeTab = signal<'editor' | 'preview'>('editor');
}
