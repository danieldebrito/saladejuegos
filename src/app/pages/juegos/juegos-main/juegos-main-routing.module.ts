import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosMainComponent } from './juegos-main.component';

const routes: Routes = [
  {
    path: '',
    component: JuegosMainComponent,
    children: [
      {
        path: 'ahorcado',
        loadChildren: () =>
          import('./../games/ahorcado/ahorcado.module').then(
            (m) => m.AhorcadoModule
          ),
      },
      {
        path: 'mayormenor',
        loadChildren: () =>
          import('./../games/mayormenor/mayormenor.module').then(
            (m) => m.MayormenorModule
          ),
      },
      {
        path: 'preguntados',
        loadChildren: () =>
          import('./../games/preguntados/preguntados.module').then(
            (m) => m.PreguntadosModule
          ),
      },
      {
        path: 'preguntadosdos',
        loadChildren: () =>
          import('./../games/preguntadosdos/preguntadosdos.module').then(
            (m) => m.PreguntadosdosModule
          ),
      },
      {
        path: 'tragamonedas',
        loadChildren: () =>
          import('./../games/tragamonedas/tragamonedas.module').then(
            (m) => m.TragamonedasModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegosMainRoutingModule {}
