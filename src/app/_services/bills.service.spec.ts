import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment';

import { BillsService } from './bills.service';
import {
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
} from './requests-common';
import { BillWithUsers } from '../models/models';

describe('BillsService', () => {
  let service: BillsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BillsService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get bills', (done) => {
    const user_id = 1;
    const expectedBills = [
      {
        id: user_id,
        description: 'desc',
        date: 'date',
        dateCreated: 'dateCreated',
        members: [],
      },
    ];

    service.getBillsWithUsersByUserId(user_id).subscribe((result) => {
      expect(result).toEqual(expectedBills);
      done();
    });

    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/bills/${user_id}`
    );

    request.flush({
      bills: expectedBills,
    });
  });

  it('should return bad request error', (done) => {
    const user_id = 1;

    service.getBillsWithUsersByUserId(user_id).subscribe((result) => {
      expect(result).toBeInstanceOf(BadRequestError);
      done();
    });

    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/bills/${user_id}`
    );

    request.flush('', { status: 404, statusText: 'Bad Request' });
  });

  it('should return unauthorized error', (done) => {
    const user_id = 1;

    service.getBillsWithUsersByUserId(user_id).subscribe((result) => {
      expect(result).toBeInstanceOf(UnauthorizedError);
      done();
    });

    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/bills/${user_id}`
    );

    request.flush('', { status: 401, statusText: 'Unauthorized' });
  });

  it('should return forbidden error', (done) => {
    const user_id = 1;

    service.getBillsWithUsersByUserId(user_id).subscribe((result) => {
      expect(result).toBeInstanceOf(ForbiddenError);
      done();
    });

    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/bills/${user_id}`
    );

    request.flush('', { status: 403, statusText: 'Forbidden' });
  });
});
