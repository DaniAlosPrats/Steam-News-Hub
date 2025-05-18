import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-card-products',
  imports: [NgStyle],
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.css'
})
export class CardProductsComponent {
  @Input() titulo: string = 'My Title';
  @Input() descripcion: string = 'My Text';
  @Input() foto: string = 'url(https://www.lavanguardia.com/files/og_thumbnail/uploads/2021/03/05/60421be64918d.jpeg)';

}
