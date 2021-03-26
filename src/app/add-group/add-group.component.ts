import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToolbarService } from '../_services/toolbar.service';

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

  addGroupForm: FormGroup;

  constructor(
    private toolbarService: ToolbarService,
    private formBuilder: FormBuilder
  ) {
    toolbarService.setShowMenu(true);
    toolbarService.setShowSideNav(true);
    toolbarService.setShowGoBackButton(true);
    //init form
    this.addGroupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      members: ['', Validators.required],
    });
  }

  saveGroup() {}

  getNameErrorMessage() {
    return 'Enter a group name';
  }

  getMemberErrorMessage() {
    return 'Enter minimum one member';
  }

  ngOnInit(): void {}
}
