import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GameListPageRoutingModule } from './game-list-routing.module';

import { GameListPage } from './game-list.page';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameListPageRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [GameListPage]
})
export class GameListPageModule {}
