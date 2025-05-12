import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-cardfav',
  imports: [NgStyle],
  templateUrl: './cardfav.component.html',
  styleUrl: './cardfav.component.css'
})
export class CardfavComponent {
 @Input() title: string = 'My Title';
  @Input() description: string = 'My Text';
  @Input() photo: string = 'url(https://www.lavanguardia.com/files/og_thumbnail/uploads/2021/03/05/60421be64918d.jpeg)';

     
  @Output() likeToggled = new EventEmitter<any>();

   isFavorite: boolean = false;
  isLiked: boolean = false;
@Input() gameId!: number;
@Output() favoriteToggled = new EventEmitter<any>();

toggleFavorite() {
  this.isFavorite = !this.isFavorite;
  console.log('Game ID al hacer click en favorito:', this.gameId);
  this.favoriteToggled.emit({
    isFavorite: this.isFavorite,
    id_juego: this.gameId
  });
}

  toggleLike() {
    this.isLiked = !this.isLiked;
    console.log('Game ID al hacer click en favorito:', this.gameId);
    this.likeToggled.emit({
    isFavorite: this.isFavorite,
    id_juego: this.gameId
  });
  }

}
