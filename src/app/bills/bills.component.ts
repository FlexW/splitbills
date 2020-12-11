import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BillsService } from '../_services/bills.service';
import { BillWithUsers } from '../models/models';
import { AuthenticationService } from '../_services';
import { RequestError } from '../_services/requests-common';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillsComponent implements OnInit {
  expand = false;
  bills: BillWithUsers[] = [];

  constructor(
    private billsService: BillsService,
    private authService: AuthenticationService
  ) {
    // for (let i = 0; i < 100; i++) {
    //   const bill: BillWithUsers = {
    //     id: 1,
    //     description: 'Bill ' + i,
    //     date: '20. November 2020',
    //     dateCreated: '20. November 2020',
    //     members: [],
    //   };
    //   this.bills.push(bill);
    // }
  }

  ngOnInit(): void {
    this.fetchBills();
  }

  private fetchBills(): void {
    const currentUser = this.authService.currentUserValue;

    if (currentUser === null) {
      return;
    }

    this.billsService
      .getBillsWithUsersByUserId(currentUser.id)
      .subscribe((result) => {
        if (!(result instanceof RequestError)) {
          this.bills = result;
        }
      });
  }
}
