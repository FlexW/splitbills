import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BillsService } from '../_services/bills.service';
import { Bill } from '../models/bill';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillsComponent {
  bills: Bill[] = [];

  constructor(private billsService: BillsService) {
    for (let i = 0; i < 100; i++) {
      const bill: Bill = { description: 'Bill ' + i, amount: 245 };
      this.bills.push(bill);
    }
  }
}
