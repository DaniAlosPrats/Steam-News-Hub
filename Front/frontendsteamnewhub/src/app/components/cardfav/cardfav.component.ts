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
  @Input() gameId: number | null = null;
  @Output() favoriteToggled = new EventEmitter<any>();

   isFavorite: boolean = false;
  isLiked: boolean = false;
   ngOnInit(): void {
    const likedGames = JSON.parse(localStorage.getItem('likedGames') || '[]');
    this.isLiked = likedGames.includes(this.gameId);
  }


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
  const likedGames = JSON.parse(localStorage.getItem('likedGames') || '[]');
  if (this.isLiked) {
    if (!likedGames.includes(this.gameId)) {
      likedGames.push(this.gameId);
    }
  } else {
    const index = likedGames.indexOf(this.gameId);
    if (index !== -1) {
      likedGames.splice(index, 1);
    }
  }
  localStorage.setItem('likedGames', JSON.stringify(likedGames));
  this.likeToggled.emit({
    isLiked: this.isLiked,
    id_juego: this.gameId
  });
}

}
