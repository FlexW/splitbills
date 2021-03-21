import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { BillsService } from '../_services/bills.service';
import { BillWithUsers } from '../models/models';
import { AuthenticationService } from '../_services';
import { RequestError } from '../_services/requests-common';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.sass'],
})
export class BillsComponent implements OnInit {
  bills: BillWithUsers[] = [];

  constructor(
    private billsService: BillsService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.fetchBills();
  }

  private fetchBills(): void {
    const currentUser = this.authService.currentUserValue;

    if (currentUser === null) {
      return;
    }
  }
}
