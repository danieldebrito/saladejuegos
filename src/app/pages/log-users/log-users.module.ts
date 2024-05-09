import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { LogUsersRoutingModule } from './log-users-routing.module';
import { LogUsersComponent } from './log-users.component';


@NgModule({
  declarations: [
    LogUsersComponent
  ],
  imports: [
    CommonModule,
    LogUsersRoutingModule,
  ],
  providers: [DatePipe],
})
export class LogUsersModule { }
