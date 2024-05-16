import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosMainRoutingModule } from './juegos-main-routing.module';
import { JuegosMainComponent } from './juegos-main.component';


@NgModule({
  declarations: [
    JuegosMainComponent
  ],
  imports: [
    CommonModule,
    JuegosMainRoutingModule
  ]
})
export class JuegosMainModule { }
