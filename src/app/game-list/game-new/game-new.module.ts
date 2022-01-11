import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { GameNewPageRoutingModule } from './game-new-routing.module';

import { GameNewPage } from './game-new.page';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    GameNewPageRoutingModule,
    FormsModule,

  ],
  declarations: [GameNewPage]
})
export class GameNewPageModule {}
