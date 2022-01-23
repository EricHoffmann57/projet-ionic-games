import {Component, OnInit} from '@angular/core';
import {StorageService} from '../services/storage/storage.service';
import {HomePage} from '../home/home.page';
import {ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {
  public photos: picture[] = [];

  game = { title: '', image: ''};
  title: string;
  storageName: string;
  image: string;
  images: any;

  constructor(
    private storage: StorageService,
    public photoService: HomePage,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
  }

  getImages(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.images = JSON.parse(params.images);
    });
  }

  setStorage() {
    this.storage.setString('title', this.title);
    this.storage.setObject('game', {
      title: this.title,
      webviewPath: this.image
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
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface picture {
  filepath: string;
  webviewPath: string;
}
