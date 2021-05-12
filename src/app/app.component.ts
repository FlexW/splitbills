import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { ToolbarService } from './_services/toolbar.service';
import { Location } from '@angular/common';

import { AuthenticationService } from './_services';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'SplitBills';
  showMenu = true;
  showSideNav = true;
  showGoBackButton = false;

  currentUser: unknown;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private location: Location,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authenticationService: AuthenticationService,
    toolbarService: ToolbarService
  ) {
    toolbarService.title.subscribe((title) => {
      this.title = title;
    });
    toolbarService.showMenu.subscribe((value) => {
      this.showMenu = value;
    });
    toolbarService.showSideNav.subscribe((value) => {
      this.showSideNav = value;
    });
    toolbarService.showGoBackButton.subscribe((value) => {
      this.showGoBackButton = value;
    });
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/welcome']);
  }

  goBack(): void {
    this.location.back();
  }
}
