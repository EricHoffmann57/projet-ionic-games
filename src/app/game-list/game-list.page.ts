import { Component, OnInit } from '@angular/core';
import {GameService} from '../services/Game/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.page.html',
  styleUrls: ['./game-list.page.scss'],
})
export class GameListPage implements OnInit {
  games!: any;
  filterTerm: any;
  selected: any;
  options: any = ['Reset filters', 'AZ', 'ZA', 'Most recent', 'rating', 'Favorite games', 'Good games'];
  isFavorite=true;

  constructor(
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private Game: GameService) {
  }

  ngOnInit() {
    this.Game.getAllGames().subscribe((data: any) => {
      this.games = data;
    });
  }

  getGames() {
    this.Game.getAllGames().subscribe((data: any) => {
      this.games = data;
    });
  }

  getGameSelection() {
    const selectedVal = this.options.findIndex(item => item === this.selected);
    // sort items in array by custom criteria
    if (selectedVal === 1) {
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      this.games.sort(function(a, b) {
        if (a.title < b.title) {return -1;}
        if (a.title > b.title) {return 1;}
        return 0;
      });
    }
    if (selectedVal === 2) {
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      this.games.sort(function(a, b) {
        if (a.title > b.title) {return -1;}
        if (a.title < b.title) {return 1;}
        return 0;
      });
    }
    if (selectedVal === 3) {
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      this.games.sort(function(a, b) {
        if (a.releaseDate > b.releaseDate) {return -1;}
        if (a.releaseDate < b.releaseDate) {return 1;}
        return 0;
      });
    }
    if (selectedVal === 4) {
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      this.games.sort(function(a, b) {
        if (a.rating > b.rating) {return -1;}
        if (a.rating < b.rating) {return 1;}
        return 0;
      });
    }
    if (selectedVal === 5) {
      this.games = this.games.filter(
        game => game.favorite === true);
    }
    if (selectedVal === 6) {
      this.games = this.games.filter(
        game => game.favorite === false);
    }
    if (selectedVal === 0) {
      this.getGames();
    }
  }
}
