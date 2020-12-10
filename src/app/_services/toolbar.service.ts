import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// export interface ToolbarStateObserver {
//   setTitle(title: string): void;
// }

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  // constructor(
  //   @Inject('ToolbarStateObserver') private observer: ToolbarStateObserver
  // ) {}

  // public get title() {
  //   return this._title;
  // }

  // public set title(title: string) {
  //   this._title = title;
  //   this.observer.setTitle(this._title);
  // }

  // private _title = 'SplitBills';

  private titleSource = new Subject<string>();

  title = this.titleSource.asObservable();

  setTitle(title: string) {
    this.titleSource.next(title);
  }
}
