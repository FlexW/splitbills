import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToolbarService } from '../_services/toolbar.service';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.sass'],
})
export class AddBillComponent implements OnInit {
  private _valid = false;
  get valid(): boolean {
    return this._valid;
  }

  addBillForm: FormGroup;

  constructor(
    toolbarService: ToolbarService,
    private formBuilder: FormBuilder
  ) {
    toolbarService.setShowMenu(false);
    toolbarService.setShowSideNav(false);
    toolbarService.setShowGoBackButton(true);

    // init form
    this.addBillForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      amount: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  saveBill() {}

  getDescriptionErrorMessage() {
    return 'Enter a description';
  }

  getAmountErrorMessage() {
    return 'Enter a description';
  }
}
