import { Component, Input, OnInit } from '@angular/core';
import { BillWithUsers } from '../models/models';

@Component({
  selector: 'app-bill-list-item',
  templateUrl: './bill-list-item.component.html',
  styleUrls: ['./bill-list-item.component.sass'],
})
export class BillListItemComponent implements OnInit {
  expand = false;

  @Input() bill: BillWithUsers;

  constructor() {
    // Default init bill
    this.bill = {
      id: 1,
      description: 'Desc',
      date: 'default',
      dateCreated: 'default',
      members: [],
    };
  }

  ngOnInit(): void {}
}
