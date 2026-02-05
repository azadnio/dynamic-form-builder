import { Component, input } from '@angular/core';
import { IFormField } from '../../../models/field';

@Component({
  selector: 'app-heading',
  imports: [],
  template: `
    <h2 class="text-2xl">{{ field().sectionHeading }}</h2>
    <p class="text-gray-600 text-lg ">{{ field().sectionDescription }}</p>
  `,
  styles: ``,
})
export class Heading {
    field = input.required<IFormField>();
}
