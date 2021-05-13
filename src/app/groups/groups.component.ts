import { Component, OnInit } from '@angular/core';
import { GroupWithUsers } from '../models/models';
import { AuthenticationService } from '../_services';
import { GroupsService } from '../_services/groups.service';
import { RequestError } from '../_services/requests-common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass'],
})
export class GroupsComponent implements OnInit {
  showVar = true;
  groups: GroupWithUsers[] = [];
  constructor(
    private groupsService: GroupsService,
    private router: Router,
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
    this.groupsService.getGroupsWithUsersByUserId().subscribe((result) => {
      if (!(result instanceof RequestError)) {
        this.groups = result;
      }
    });
  }

  openAddGroup(): void {
    this.router
      .navigate(['/addgroup'])
      .then((success) => console.log('navigation success?', success))
      .catch(console.error);
  }
}
