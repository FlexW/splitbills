import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToolbarService } from '../_services/toolbar.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.sass'],
})
export class OverviewComponent {
  rootUrl = '';

  navigation = [
    {
      name: 'Groups',
      link: '/groups',
    },
    {
      name: 'Bills',
      link: '/bills',
    },
  ];
  background: ThemePalette = undefined;

  constructor(
    toolbarService: ToolbarService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    toolbarService.setShowMenu(true);
    toolbarService.setShowSideNav(true);
  }
}
