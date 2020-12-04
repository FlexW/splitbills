import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  constructor(private location: Location) {}

  public goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    // Empty
  }
}
