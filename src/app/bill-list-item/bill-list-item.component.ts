import { Component, Input, OnInit } from '@angular/core';
import { BillWithUsers } from '../models/models';

function formatAmount(amount: number): string {
  return (amount / 100.0).toString();
}

@Component({
  selector: 'app-bill-list-item',
  templateUrl: './bill-list-item.component.html',
  styleUrls: ['./bill-list-item.component.sass'],
})
export class BillListItemComponent implements OnInit {
  expand = false;

  @Input() set bill(value: BillWithUsers) {
    this._description = value.description;
    this._date = this.formatDate(value.date);
    this._creditors = this.formatCreditors(value.members);
    this._debtors = this.formatDebtors(value.members);
  }

  private _description: string = '';
  get description(): string {
    return this._description;
  }

  private _date: string = '';
  get date(): string {
    return this._date;
  }

  private _creditors: string[] = [];
  get creditors(): string[] {
    return this._creditors;
  }

  private _debtors: string[] = [];
  get debtors(): string[] {
    return this._debtors;
  }

  constructor() {}

  ngOnInit(): void {}

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  private formatCreditors(
    members: {
      firstName: string;
      lastName: string;
      amount: number;
    }[]
  ): string[] {
    const result: string[] = [];

    for (let i in members) {
      // Is it a creditor?
      if (members[i].amount < 0) {
        const firstName = members[i].firstName;
        const lastName = members[i].lastName;
        const amount = formatAmount(Math.abs(members[i].amount));
        const s = `${firstName} ${lastName} paid ${amount} €`;

        result.push(s);
      }
    }

    return result;
  }

  private formatDebtors(
    members: {
      firstName: string;
      lastName: string;
      amount: number;
    }[]
  ): string[] {
    const result: string[] = [];

    for (let i in members) {
      // Is it a debtor?
      if (members[i].amount > 0) {
        const firstName = members[i].firstName;
        const lastName = members[i].lastName;
        const amount = formatAmount(Math.abs(members[i].amount));
        const s = `${firstName} ${lastName} borrowed ${amount} €`;

        result.push(s);
      }
    }

    return result;
  }
}
