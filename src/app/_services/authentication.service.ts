import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

interface CurrentUser {
  id: number;
  email: string;
  token: string;
}

interface AuthenticateRequestResult {
  id: number;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public currentUser: Observable<unknown>;

  private currentUserSubject: BehaviorSubject<CurrentUser | null>;

  constructor(private http: HttpClient) {
    const currentUserData = localStorage.getItem('currentUser');

    if (currentUserData !== null) {
      const currentUserJson = JSON.parse(currentUserData);
      this.currentUserSubject = new BehaviorSubject<CurrentUser | null>(
        currentUserJson
      );
    } else {
      this.currentUserSubject = new BehaviorSubject<CurrentUser | null>(null);
    }

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): CurrentUser | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<unknown> {
    return this.http
      .post<AuthenticateRequestResult>(`${environment.apiUrl}/tokens`, {
        email: email,
        password: password,
      })
      .pipe(
        map((result: AuthenticateRequestResult) => {
          // store user details and token in local storage to keep
          // user logged in between page refreshes
          const user: CurrentUser = {
            id: result.id,
            email: email,
            token: result.token,
          };

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);

          return user;
        })
      );
  }

  logout(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
