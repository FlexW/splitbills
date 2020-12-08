import { Component } from '@angular/core';

import { BillsService } from '../_services/bills.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
})
export class BillsComponent {
  constructor(private billsService: BillsService) {}
}
