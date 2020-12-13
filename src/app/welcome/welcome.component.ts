import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from '../_services/toolbar.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass'],
})
export class WelcomeComponent implements OnInit {
  constructor(toolbarService: ToolbarService, private router: Router) {
    toolbarService.setShowMenu(false);
    toolbarService.setShowSideNav(false);
  }

  ngOnInit(): void {}
}
