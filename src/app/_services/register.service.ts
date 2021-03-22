import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

export interface RegisterRequestResult {
  message: string;
  user: { id: number };
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<unknown> {
    return this.http
      .post<RegisterRequestResult>(
        `${environment.apiUrl}/users`,
        {
          "first_name": firstName,
          "last_name": lastName,
          "email": email,
          "password": password,
        },
        {
          headers: this.getHeaders(),
        }
      )
      .pipe(
        map((result: RegisterRequestResult) => {
          console.log(result);
        })
      );
  }
  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
