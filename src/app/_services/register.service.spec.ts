import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { RegisterService } from './register.service';
import { environment } from '@environments/environment';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(RegisterService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send create user request', () => {
    const lastName = 'Weilbach';
    const firstName = 'Tim';
    const email = 'test@mail.de';
    const password = '123';

    service.register(lastName, firstName, email, password).subscribe();

    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/users`
    );

    request.flush({});

    expect(request.request.method).toEqual('POST');
    expect(request.request.headers.get('Content-Type')).toEqual(
      'application/json'
    );
  });
});
