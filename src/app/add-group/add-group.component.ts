import { Component, OnInit, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToolbarService } from '../_services/toolbar.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GroupsService } from '../_services/groups.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.sass'],
})
export class AddGroupComponent implements OnInit {
  private _valid = false;
  get valid(): boolean {
    return this._valid;
  }

  messages: any[] = [];
  groupName: string = '';

  addGroupForm: FormGroup;
  isOn = true;
  memberList: { email: string }[] = [];

  groupError: boolean = false;
  groupErrorMessage: string = 'Verify your inputs';

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

  hideMemberListComponent(isOn: boolean) {
    isOn = true;
    this.isOn = isOn;
  }

  setMemberList(memberList: string[]) {
    this.memberList = memberList.map((memberEmail: string) => {
      return { email: memberEmail };
    });
  }

  getGroupName(): string {
    return this.groupName;
  }
  getNameErrorMessage() {
    return 'Enter a group name';
  }

  ngOnInit(): void {}

  ngOnDestroy() {}

  createGroup(): void {
    console.log(this.memberList);
    console.log(this.groupName);
    this.groupsService
      .createNewGroup(this.groupName, this.memberList)
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
