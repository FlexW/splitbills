import { Component, OnInit } from '@angular/core';

import { BillsService } from '../_services/bills.service';
import { BillWithUsers } from '../models/models';
import { AuthenticationService } from '../_services';
import { RequestError } from '../_services/requests-common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.sass'],
})
export class BillsComponent implements OnInit {
  bills: BillWithUsers[] = [];

  constructor(
    private router: Router,
    private billsService: BillsService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.fetchBills();
  }

  openAddBill(): void {
    console.log('open add bill');
    this.router.navigate(['/', 'addbill']);
  }

  private fetchBills(): void {
    this.billsService.getBillsWithUsers().subscribe((result) => {
      if (!(result instanceof RequestError)) {
        this.bills = result;
      }
    });
  }
}
