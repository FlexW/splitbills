import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BillsService } from '../_services/bills.service';
import { BillWithUsers } from '../models/models';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillsComponent {
  expand = false;
  bills: BillWithUsers[] = [];

  constructor(private billsService: BillsService) {
    for (let i = 0; i < 100; i++) {
      const bill: BillWithUsers = {
        id: 1,
        description: 'Bill ' + i,
        date: '20. November 2020',
        dateCreated: '20. November 2020',
        members: [],
      };
      this.bills.push(bill);
    }
  }
}
