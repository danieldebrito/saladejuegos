import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogUsersComponent } from './log-users.component';

const routes: Routes = [{ path: '', component: LogUsersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogUsersRoutingModule { }
