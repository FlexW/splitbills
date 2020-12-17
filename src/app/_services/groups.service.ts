import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GroupWithUsers } from '../models/models';
import { handleError, RequestError } from './requests-common';
import { getHeaders } from './service-common';

interface GroupsWithUsersRequestResult {
  groups: GroupWithUsers[];
}

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private http: HttpClient) {}

  getGroupsWithUsersByUserId(
    userId: number
  ): Observable<GroupWithUsers[] | RequestError> {
    return this.http
      .get<GroupsWithUsersRequestResult>(
        `${environment.apiUrl}/groups/${userId}`,
        {
          headers: getHeaders(),
        }
      )
      .pipe(
        map((result: GroupsWithUsersRequestResult) => {
          return result.groups;
        }),
        catchError(handleError)
      );
  }
}
