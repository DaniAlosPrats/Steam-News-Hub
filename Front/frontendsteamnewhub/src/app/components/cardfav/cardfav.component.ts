import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-cardfav',
  imports: [NgStyle],
  templateUrl: './cardfav.component.html',
  styleUrl: './cardfav.component.css'
})
export class CardfavComponent {
 @Input() titulo: string = 'My Title';
  @Input() descripcion: string = 'My Text';
  @Input() foto: string = 'url(https://www.lavanguardia.com/files/og_thumbnail/uploads/2021/03/05/60421be64918d.jpeg)';

     
  @Output() likeToggled = new EventEmitter<any>();
  @Input() gameId: number | null = null;
  @Output() favoriteToggled = new EventEmitter<any>();

   isFavorite: boolean = false;
  
  


toggleFavorite() {
  this.isFavorite = !this.isFavorite;
  this.favoriteToggled.emit({
    isFavorite: this.isFavorite,
    id_juego: this.gameId
  });
}


 
}
