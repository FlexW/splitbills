import { Component, Input, OnInit } from '@angular/core';
import { GroupWithUsers } from '../models/models';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-group-list-item',
  templateUrl: './group-list-item.component.html',
  styleUrls: ['./group-list-item.component.sass'],
})
export class GroupListItemComponent implements OnInit {
  expand = false;

  @Input() set group(value: GroupWithUsers) {
    this._description = value.description;
    this._date = this.formatDate(value.date);
    this._members = this.formatMembers(value.members);
  }

  private _description: string = '';
  get description(): string {
    return this._description;
  }

  private _date: string = '';
  get date(): string {
    return this._date;
  }

  private _members: { label: string; style: { color: string } }[] = [];
  get members(): { label: string; style: { color: string } }[] {
    return this._members;
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  private formatMembers(
    members: {
      id: number;
      firstName: string;
      lastName: string;
    }[]
  ): { label: string; style: { color: string } }[] {
    const result: { label: string; style: { color: string } }[] = [];

    for (let member of members) {
      const firstName = member.firstName;
      const lastName = member.lastName;
      const label = `${firstName} ${lastName} is a member.`;

      let style = { color: 'black' };

      if (this._currentUserId === member.id) {
        style = { color: 'green' };
      }
      result.push({ label: label, style: style });
    }
    return result;
  }

  private _currentUserId = 0;

  constructor(private authService: AuthenticationService) {
    this.getCurrentUserId();
  }

  private getCurrentUserId() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser != null) {
      this._currentUserId = currentUser.id;
    }
  }

  ngOnInit(): void {}
}
