import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forgot-pw',
  templateUrl: './forgot-pw.component.html',
  styleUrls: ['./forgot-pw.component.sass']
})
export class ForgotPwComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  public goBack(): void {
    this.location.back();
  }

}
