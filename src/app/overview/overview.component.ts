import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { ToolbarService } from '../_services/toolbar.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.sass'],
})
export class OverviewComponent {
  constructor(toolbarService: ToolbarService) {
    toolbarService.setShowMenu(true);
    toolbarService.setShowSideNav(true);
    toolbarService.setShowGoBackButton(false);
  }

  onSelectedTabChange(event: MatTabChangeEvent): void {}
}
