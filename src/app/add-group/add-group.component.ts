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
  memberList: string[] = [];

  constructor(
    private toolbarService: ToolbarService,
    private formBuilder: FormBuilder,
    private router: Router
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
  getMemberList(memberList: string[]) {
    this.memberList = memberList;
  }
  getNameErrorMessage() {
    return 'Enter a group name';
  }

  ngOnInit(): void {}

  ngOnDestroy() {}

  createGroup(): void {
    console.log(this.memberList);
  }
}
