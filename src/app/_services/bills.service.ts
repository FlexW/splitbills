import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BillWithUsers } from '../models/models';
import { handleError, RequestError } from './requests-common';
import { getHeaders } from './service-common';

interface BillsWithUsersRequestResult {
  bills: BillWithUsers[];
}

export interface BillsRequestResult {
  message: string;
  group: { id: number };
}

@Injectable({
  providedIn: 'root',
})
export class BillsService {
  constructor(private http: HttpClient) {}

  getBillsWithUsersByUserId(): Observable<BillWithUsers[] | RequestError> {
    return this.http
      .get<BillsWithUsersRequestResult>(`${environment.apiUrl}/bills`, {
        headers: getHeaders(),
      })
      .pipe(
        map((result: BillsWithUsersRequestResult) => {
          return result.bills;
        }),
        catchError(handleError)
      );
  }
}
