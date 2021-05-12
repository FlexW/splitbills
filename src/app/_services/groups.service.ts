import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GroupWithUsers } from '../models/models';
import { handleError, RequestError } from './requests-common';

interface GroupsWithUsersRequestResult {
  groups: GroupWithUsers[];
}
export interface CreateGroupRequestResult {
  message: string;
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
      .get<GroupsWithUsersRequestResult>(`${environment.apiUrl}/groups`)
      .pipe(
        map((result: GroupsWithUsersRequestResult) => {
          return result.groups;
        }),
        catchError(handleError)
      );
  }

  createNewGroup(
    name: string,
    members: { email: string }[]
  ): Observable<unknown> {
    return this.http
      .post<CreateGroupRequestResult>(`${environment.apiUrl}/groups`, {
        name: name,
        members: members,
      })
      .pipe(
        map((result: CreateGroupRequestResult) => {
          console.log(result);
        }),
        catchError(handleError)
      );
  }
}
