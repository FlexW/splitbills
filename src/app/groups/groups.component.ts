import { Component, OnInit } from '@angular/core';
import { GroupWithUsers } from '../models/models';
import { AuthenticationService } from '../_services';
import { GroupsService } from '../_services/groups.service';
import { RequestError } from '../_services/requests-common';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass'],
})
export class GroupsComponent implements OnInit {
  groups: GroupWithUsers[] = [];
  constructor(
    private groupsService: GroupsService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.fetchGroups();
  }

  private fetchGroups(): void {
    const currentUser = this.authService.currentUserValue;

    if (currentUser === null) {
      return;
    }
    this.groupsService
      .getGroupsWithUsersByUserId(currentUser.id)
      .subscribe((result) => {
        if (!(result instanceof RequestError)) {
          this.groups = result;
        }
      });
  }
}
