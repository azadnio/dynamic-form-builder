import { Component, DOCUMENT, inject, signal } from '@angular/core';
import { FormElementsMenu } from "./components/form-elements-menu/form-elements-menu";
import { MainCanvas } from "./components/main-canvas/main-canvas";
import { FieldSettings } from "./components/field-settings/field-settings";
import { CdkDropListGroup } from "@angular/cdk/drag-drop";
import { MatIcon } from "@angular/material/icon";
import { MatAnchor } from "@angular/material/button";
import { ExportForm } from './services/download-form';
import { Theme } from './services/theme';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  imports: [FormElementsMenu, MainCanvas, FieldSettings, CdkDropListGroup, MatIcon, MatAnchor, MatMenuModule],
  template: `
    <div class="flex flex-col h-screen bg-background px-4">
      <div class="flex flex-col gap-1 items-center justify-center py-10">
        <h1 class="text-2xl tracking-wide font-medium text-primary">Angular Forms Designer</h1>
        <p class="text-on-background">
          Create beautiful, responsive forms with Angular Material and Tailwind CSS.
        </p>
        <div>
          <mat-icon (click)="themeService.toggleMode()" class="cursor-pointer hover:scale-110 transition-all duration-300 text-primary!">{{ themeService.colorMode() === 'light' ? 'light_mode' : 'dark_mode' }}</mat-icon>
          <mat-icon class="ml-4 text-primary! cursor-pointer hover:scale-110 transition-all duration-300" [matMenuTriggerFor]="themeMenu">format_color_fill</mat-icon>
          <mat-menu #themeMenu="matMenu">
            @for(theme of themeService.themes(); track theme.name) {
              <button mat-menu-item (click)="themeService.setTheme(theme.name)">
                <div class="flex">
                  <span class="w-5 h-5 rounded-full mr-4 border border-gray-300 inline-block" [style.backgroundColor]="themeService.colorMode() === 'light' ? theme.primaryColorLight : theme.primaryColorDark"></span>
                  <span>{{ theme.label }}</span>
                </div>
              </button>
            }
          </mat-menu>
        </div>
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
  themeService = inject(Theme);
}
