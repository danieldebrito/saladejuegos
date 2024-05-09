import { Component, OnInit } from '@angular/core';
import { LogUserService } from '../../auth/services/log-user.service';
import { UserLog } from '../../auth/class/userLog';

@Component({
  selector: 'app-log-users',
  templateUrl: './log-users.component.html',
  styleUrl: './log-users.component.scss'
})
export class LogUsersComponent implements OnInit {

  public logs: UserLog[] = [];

  constructor(
    private logSvc: LogUserService,
  ) { }

  ngOnInit(): void {
    this.logSvc.getItems().subscribe(res => {
      this.logs = res.map(log => {
        // Assuming 'fechaIngreso' holds the timestamp
        const jsDate = log.fechaIngreso?.toDate ? log.fechaIngreso.toDate() : new Date(log.fechaIngreso * 1000 + (log.fechaIngreso ? log.fechaIngreso : 0)); // Handle different timestamp formats
        return { ...log, fechaIngreso: jsDate }; // Create a new object with converted date
      });

      console.log(this.logs);
    });
  }
}
