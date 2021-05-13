import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToolbarService } from '../_services/toolbar.service';
import { Router } from '@angular/router';
import { GroupsService } from '../_services/groups.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.sass'],
})
export class AddGroupComponent {
  private _valid = false;

  get valid(): boolean {
    return this._valid;
  }

  groupName = '';

  addGroupForm: FormGroup;
  isOn = true;
  memberList: string[] = [];

  groupError = false;
  groupErrorMessage = 'Verify your inputs';

  constructor(
    private toolbarService: ToolbarService,
    private formBuilder: FormBuilder,
    private router: Router,
    private groupsService: GroupsService
  ) {
    toolbarService.setShowMenu(false);
    toolbarService.setShowSideNav(false);
    toolbarService.setShowGoBackButton(true);
    //init form
    this.addGroupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  hideMemberListComponent(isOn: boolean): void {
    isOn = true;
    this.isOn = isOn;
  }

  setMemberList(memberList: string[]): void {
    this.memberList = memberList;
  }

  getGroupName(): string {
    return this.groupName;
  }

  getNameErrorMessage(): string {
    return 'Enter a group name';
  }

  createGroup(): void {
    console.log(this.memberList);
    console.log(this.groupName);

    const memberList = this.memberList.map((memberEmail: string) => {
      return { email: memberEmail };
    });

    this.groupsService
      .createNewGroup(this.groupName, memberList)
      .pipe(first())
      .subscribe(
        () => {
          this.addGroupForm.reset();
        },
        (error) => {
          this.groupError = true;
          this.groupErrorMessage = error.error.message;
        }
      );
  }
}
