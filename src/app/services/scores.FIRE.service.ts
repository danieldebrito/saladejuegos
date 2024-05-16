import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { catchError, from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { Score } from '../class/score';

@Injectable({
  providedIn: 'root',
})
export class ScoresService {

  constructor(private firestore: Firestore) {}

  public addItem(item: Score): Observable<void> {
    const col = collection(this.firestore, 'scores');
    const newDoc = doc(col);
    item.id = newDoc.id;
    setDoc(newDoc, item);
    return from(Promise.resolve());
  }

  public getItems(): Observable<Score[]> {
    const col = collection(this.firestore, 'scores');
    //                 const queryObservable = query(col, orderBy('email')); // ORDENARRRR
    const observable = collectionData(col).pipe(
      map((res) => {
        return res as Score[];
      }),
      catchError((err) => {
        console.error('Error obteniendo datos:', err);
        return throwError(() => err);
      })
    );
    return observable;
  }

  public getItemById(id: string): Observable<Score> {
    const col = collection(this.firestore, 'scores');
    const documento = doc(col, id);

    const observable = docData(documento).pipe(
      map((res) => {
        return res as Score;
      }),
      catchError((err) => {
        console.error('Error obteniendo el documento:', err);
        return throwError(() => err);
      })
    );
    return observable;
  }

  public getItemByUid(uid: string): Observable<Score> {
    const col = collection(this.firestore, 'scores');
    const queryRef = query(col, where('uid', '==', uid));

    const observable = collectionData(queryRef).pipe(
      map((res) => {
        // Debería haber solo un resultado, por lo que se toma el primer elemento del array
        const user = res[0];
        return user as Score;
      }),
      catchError((err) => {
        console.error('Error obteniendo el Score:', err);
        return throwError(() => err);
      })
    );
    return observable;
  }

  public update(Item: any) {
    const col = collection(this.firestore, 'scores');
    const documento = doc(col, Item.id);

    updateDoc(documento, Item);
  }

  public delete(id: string) {
    const col = collection(this.firestore, 'scores');
    const documento = doc(col, id);

    deleteDoc(documento);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  public getSetUserScore(uid: string): Observable<Score> {
    return this.getItems().pipe(
      switchMap(scores => {
        const existingScore = scores.find(sc => sc.uid === uid);
        if (existingScore) {
          return of(existingScore); // Return existing score
        } else {
          // Create new score object with initial values
          const newScore: Score = {
            uid: uid,
            // ... other score properties
          };
  
          // Add new score to Firestore (assuming addItem returns an observable)
          return this.addItem(newScore).pipe(
            // No need for another switchMap here
            map(() => newScore) // Return the new score object after adding
          );
        }
      }),
      catchError(err => {
        console.error('Error obtaining or creating score:', err);
        return throwError(() => err);
      })
    );
  }
  
  
}
