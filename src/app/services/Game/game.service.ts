import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Game } from 'src/app/models/games.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gamesRef: AngularFirestoreCollection<Game>;
  private dbPath = '/games';

  constructor(
    private db: AngularFirestore
  ) {
    this.gamesRef = db.collection(this.dbPath);
  }

  getAllGames(): any {
    return this.gamesRef.snapshotChanges().pipe(
      map((changes: any) => changes.map((doc: any) => ({id: doc.payload.doc.id, ...doc.payload.doc.data()})))
    );
  }

  saveNewGame(game: Game): any {
    return new Observable(obs => {
      this.gamesRef.add({...game}).then(() => {
        obs.next();
      });
    });
  }

  get(id: any): any {
    return new Observable(obs => {
      this.gamesRef.doc(id).get().subscribe(res => {
        obs.next({id: res.id, ...res.data()});
      });
    });
  }

  update(game: Game) {
    return new Observable(obs => {
      this.gamesRef.doc(game.id).update(game);
      obs.next();
    });
  }
  delete(id: any) {
    this.db.doc(`games/${id}`).delete();
  }
}
