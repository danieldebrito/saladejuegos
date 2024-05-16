import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AuthService } from './auth/services/auth.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'saladejuegos-ab1c6',
        appId: '1:504605961546:web:91c5bfe695c42616b8a5b3',
        storageBucket: 'saladejuegos-ab1c6.appspot.com',
        apiKey: 'AIzaSyA2XE1h-w1gi57O0ni6Hm90qdnkuurT3nY',
        authDomain: 'saladejuegos-ab1c6.firebaseapp.com',
        messagingSenderId: '504605961546',
        measurementId: 'G-80C148SYBS',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp({
      projectId: 'saladejuegos-ab1c6',
      appId: '1:504605961546:web:91c5bfe695c42616b8a5b3',
      storageBucket: 'saladejuegos-ab1c6.appspot.com',
      apiKey: 'AIzaSyA2XE1h-w1gi57O0ni6Hm90qdnkuurT3nY',
      authDomain: 'saladejuegos-ab1c6.firebaseapp.com',
      messagingSenderId: '504605961546',
      measurementId: 'G-80C148SYBS',
    }),
  ],
  providers: [provideClientHydration(), AuthService, provideHttpClient(withFetch()), provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule { }
