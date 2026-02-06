import { Component, DOCUMENT, inject, signal } from '@angular/core';
import { FormElementsMenu } from "./components/form-elements-menu/form-elements-menu";
import { MainCanvas } from "./components/main-canvas/main-canvas";
import { FieldSettings } from "./components/field-settings/field-settings";
import { CdkDropListGroup } from "@angular/cdk/drag-drop";
import { MatIcon } from "@angular/material/icon";
import { MatAnchor } from "@angular/material/button";
import { ExportForm } from './services/download-form';

@Component({
  selector: 'app-root',
  imports: [ FormElementsMenu, MainCanvas, FieldSettings, CdkDropListGroup, MatIcon, MatAnchor],
  template: `
    <div class="flex flex-col h-screen bg-background px-4">
      <div class="flex flex-col gap-1 items-center justify-center py-10">
        <h1 class="text-2xl tracking-wide font-medium text-primary">Angular Forms Designer</h1>
        <p class="text-on-background">
          Create beautiful, responsive forms with Angular Material and Tailwind CSS.
        </p>
        <mat-icon (click)="toggleTheme()" class="cursor-pointer hover:scale-110 transition-all duration-300 text-primary!">{{ isLigthMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
      </div>

      <div class="flex gap-4 relative" cdkDropListGroup>
        <app-form-elements-menu class="w-64"/>
        <app-main-canvas class="flex-1"/>
        <app-field-settings class="w-64"/>
        <button mat-flat-button class="absolute! -top-12.5 right-0 compact-button" (click)="formExportService.exportForm()">
          Export Form
          <mat-icon>download</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class App {
  formExportService = inject(ExportForm);
  isLigthMode = signal(true);
  document = inject(DOCUMENT);

  toggleTheme() {
    this.isLigthMode.set(!this.isLigthMode());
    this.document.body.classList.toggle('dark', !this.isLigthMode());
  }
}
