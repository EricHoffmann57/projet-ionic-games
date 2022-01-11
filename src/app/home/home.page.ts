import { Component } from '@angular/core';
import {StorageService} from '../services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  game = { title: '', gameSystem: '', artwork: ''};
  title: string;
  storageName: string;
  gameSystem: string;
  artwork: string;

  constructor(
    private storage: StorageService
  ) {}

  setStorage() {
    this.storage.setString('title', this.title);
    this.storage.setObject('game', {
      title: this.title,
      gameSystem: this.gameSystem,
      artwork: this.artwork
    });
  }

  getStorage() {
    this.storage.getString('title').then((data: any) => {
      if (data.value) {
        this.storageName = data.value;
      }
    });
    this.storage.getObject('game').then((data: any) => {
      this.game = data;
    });
  }
  clearStorage() {
    this.storage.clear();
  }
}
