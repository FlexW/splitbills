import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// export interface ToolbarStateObserver {
//   setTitle(title: string): void;
// }

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  private titleSource = new Subject<string>();

  title = this.titleSource.asObservable();

  setTitle(title: string) {
    this.titleSource.next(title);
  }

  private showSideNavSource = new Subject<boolean>();

  showSideNav = this.showSideNavSource.asObservable();

  setShowSideNav(value: boolean) {
    this.showSideNavSource.next(value);
  }

  private showMenuSource = new Subject<boolean>();

  showMenu = this.showMenuSource.asObservable();

  setShowMenu(value: boolean) {
    this.showMenuSource.next(value);
  }

  private showGoBackButtonSource = new Subject<boolean>();

  showGoBackButton = this.showGoBackButtonSource.asObservable();

  setShowGoBackButton(value: boolean) {
    this.showGoBackButtonSource.next(value);
  }
}
