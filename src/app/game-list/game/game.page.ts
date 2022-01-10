import { Component, OnInit } from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../../services/Game/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  modif!: boolean;
  game: any = null;

  constructor(
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private Game: GameService,
    private toastCtrl: ToastController,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.modif = false;
    const id = this.route.snapshot.paramMap.get('id');
    this.Game.get(id).subscribe((value: any) => {
      this.game = value;
    });
  }

  async setModif() {
    if (!this.modif) {
      const alert = await this.alertCtrl.create({
        header: 'Do you agree to modify ?',
        subHeader: 'You will allow modification',
        buttons: [
          {
            text: 'Cancel',
            role: 'Cancel'
          }, {
            text: 'Confirm',
            handler: () => {
              this.modif = !this.modif;
            }
          }
        ]
      });

      await alert.present();
    } else {
      this.modif = !this.modif;
    }
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Changes have been registered!',
      duration: 2000
    });
    await (await toast).present();
  }

  onModif() {
    this.Game.update(this.game).subscribe(() => {
      this.presentToast();
      this.modif = false;
    });
  }

  onDelete(id: any) {
    if (confirm('Are you sure to delete ' + id)) {
      this.Game.delete(id);
      this.router.navigate(['/tabs/games']);
    }
  }
}
