import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment';

import { GroupsService } from './groups.service';
import { BadRequestError } from './requests-common';

describe('GroupsService', () => {
  let service: GroupsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GroupsService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return bad request error', (done) => {
    const user_id = 1;

    service.getGroupsWithUsersByUserId(user_id).subscribe((result) => {
      expect(result).toBeInstanceOf(BadRequestError);
      done();
    });

    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/groups/${user_id}`
    );

    request.flush('', { status: 404, statusText: 'Bad Request' });
  });

  it('should get groups', (done) => {
    const user_id = 1;
    const expectedGroups = [
      {
        id: user_id,
        description: 'desc',
        date: 'date',
        dateCreated: 'dateCreated',
        members: [],
      },
    ];

    service.getGroupsWithUsersByUserId(user_id).subscribe((result) => {
      expect(result).toEqual(expectedGroups);
      done();
    });

    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/groups/${user_id}`
    );

    request.flush({
      groups: expectedGroups,
    });
  });
});
