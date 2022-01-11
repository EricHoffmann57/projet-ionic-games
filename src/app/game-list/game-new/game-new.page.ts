import { Component, OnInit } from '@angular/core';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Game} from '../../models/games.model';
import {GameService} from '../../services/Game/game.service';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-game-new',
  templateUrl: './game-new.page.html',
  styleUrls: ['./game-new.page.scss'],
})
export class GameNewPage implements OnInit {
  public game!: Game;
  ionicForm: any;

  constructor(
    private Game: GameService,
    private toastCtrl: ToastController,
    private router: Router,
    private routerOutlet: IonRouterOutlet,
  ) { }

  ngOnInit() {
    this.game = new Game();
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'New game registered!',
      duration: 2000
    });
    (await toast).present().then(() => {
      setTimeout(() => {
        this.router.navigate(['/tabs/games']);
      }, 2000);
    });
  }


  add() {
    this.Game.saveNewGame(this.game).subscribe(() => {
      this.game = new Game();
      this.presentToast();
    });
  }
  goBack() {
    this.routerOutlet.pop();
  }
}
