import { Component, Input, OnInit } from '@angular/core';
import { BillWithUsers } from '../models/models';
import { AuthenticationService } from '../_services';

function formatAmount(amount: number): string {
  return (amount / 100.0).toFixed(2).toString();
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
    this.setSummary(value.members);
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

  private _summary: string = '';
  get summary(): string {
    return this._summary;
  }

  private _summaryStyle: { color: string } = { color: 'red' };
  get summaryStyle(): { color: string } {
    return this._summaryStyle;
  }

  private _currentUserId = 0;

  constructor(private authService: AuthenticationService) {
    this.getCurrentUserId();
  }

  ngOnInit(): void {}

  private getCurrentUserId() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser != null) {
      this._currentUserId = currentUser.id;
    }
  }

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

  private formatSummary(totalAmount: number): string {
    if (totalAmount > 0) {
      return `You borrowed ${formatAmount(Math.abs(totalAmount))} €`;
    } else if (totalAmount < 0) {
      return `You paid ${formatAmount(Math.abs(totalAmount))} €`;
    } else {
      return 'You are balanced';
    }
  }

  private getTotalAmountOfCurrentUser(
    members: {
      id: number;
      amount: number;
    }[]
  ): number {
    let sum = 0;

    for (let member of members) {
      if (member.id == this._currentUserId) {
        sum += member.amount;
      }
    }

    return sum;
  }

  private getSummaryStyle(totalAmount: number) {
    if (totalAmount > 0) {
      return { color: 'red' };
    }
    return { color: 'green' };
  }

  private setSummary(
    members: {
      id: number;
      amount: number;
    }[]
  ) {
    const totalAmount = this.getTotalAmountOfCurrentUser(members);
    this._summary = this.formatSummary(totalAmount);
    this._summaryStyle = this.getSummaryStyle(totalAmount);
  }
}
