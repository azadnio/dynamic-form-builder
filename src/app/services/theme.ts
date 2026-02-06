import { DOCUMENT, effect, inject, Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';
import { ITheme } from '../models/theme';


@Injectable({
  providedIn: 'root',
})
export class Theme {

  private _themes = signal<ITheme[]>([
    { name: 'blue-theme', label: 'Blue', primaryColorLight: '#006591', primaryColorDark: '#89ceff' },
    { name: 'green-theme', label: 'Green', primaryColorLight: '#006e11', primaryColorDark: '#7bdc71' },
    { name: 'maroon-theme', label: 'Maroon', primaryColorLight: '#b52519', primaryColorDark: '#ffb4a8' },
    { name: 'olive-theme', label: 'Olive', primaryColorLight: '#656100', primaryColorDark: '#d1ca59' },
    { name: 'black-theme', label: 'Black', primaryColorLight: '#5f5e5e', primaryColorDark: '#c9c6c5' },
  ]);
  private _currentTheme = signal<string>('blue-theme');
  private _colorMode = signal<'light' | 'dark'>('light');
  private document = inject(DOCUMENT);
  private rendererFactory = inject(RendererFactory2);

  private renderer = this.rendererFactory.createRenderer(null, null);

  public currentTheme = this._currentTheme.asReadonly();
  public themes = this._themes.asReadonly();
  public colorMode = this._colorMode.asReadonly();

  toggleMode() {
    this._colorMode.set(this._colorMode() === 'light' ? 'dark' : 'light');
  }

  setTheme(theme: string) {
    if (this._themes().some(t => t.name === theme)) {
      this._currentTheme.set(theme);
    }
  }

  private toggleColorMode = effect(() => {
    const mode = this._colorMode();
    if (mode === 'dark') {
      this.renderer.addClass(this.document.body, 'dark');
    }
    else {
      this.renderer.removeClass(this.document.body, 'dark');
    }
  });
  
  private applyTheme = effect(() => {
    const theme = this._currentTheme();
    this._themes().forEach(t => {
      this.renderer.removeClass(this.document.documentElement, t.name);
    });
    this.renderer.addClass(this.document.documentElement, theme);
  });

}
