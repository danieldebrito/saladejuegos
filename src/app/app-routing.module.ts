import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // auth ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  { path: 'sign-in', loadChildren: () => import('./auth/pages/sign-in/sign-in.module').then(m => m.SignInModule) },
  { path: 'forgot-password', loadChildren: () => import('./auth/pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'verify-email', loadChildren: () => import('./auth/pages/verify-email/verify-email.module').then(m => m.VerifyEmailModule) },
  { path: 'sign-up', loadChildren: () => import('./auth/pages/sign-up/sign-up.module').then(m => m.SignUpModule) },
  // juegos ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  { path: 'scores', loadChildren: () => import('./pages/juegos/scores/scores.module').then(m => m.ScoresModule) },
  { path: 'juegos/ahorcado', loadChildren: () => import('./pages/juegos/ahorcado/ahorcado.module').then(m => m.AhorcadoModule) },
  { path: 'juegos/mayormenor', loadChildren: () => import('./pages/juegos/mayormenor/mayormenor.module').then(m => m.MayormenorModule) },
  { path: 'juegos/preguntados', loadChildren: () => import('./pages/juegos/preguntados/preguntados.module').then(m => m.PreguntadosModule) },
  { path: 'juegos/preguntadosdos', loadChildren: () => import('./pages/juegos/preguntadosdos/preguntadosdos.module').then(m => m.PreguntadosdosModule) },
  { path: 'juegos/tragamonedas', loadChildren: () => import('./pages/juegos/tragamonedas/tragamonedas.module').then(m => m.TragamonedasModule) },
  // pages ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule) },
  { path: 'chat', loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatModule) },
  { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
  { path: 'log', loadChildren: () => import('./pages/log-users/log-users.module').then(m => m.LogUsersModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
