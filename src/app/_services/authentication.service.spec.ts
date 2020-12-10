import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestScheduler } from 'rxjs/testing';

import { AuthenticationService } from './authentication.service';
import { environment } from '@environments/environment';

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthenticationService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send authentication request', () => {
    const email = 'test@mail.de';
    const password = '123';

    service.login(email, password).subscribe();

    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/users/authenticate`
    );

    request.flush({});

    expect(request.request.method).toEqual('POST');
    expect(request.request.headers.get('Content-Type')).toEqual(
      'application/json'
    );
    expect(request.request.headers.get('Authorization')).toEqual(
      'Basic ' + btoa(email + ':' + password)
    );
  });

  it('should store authenticated user', () => {
    const email = 'test@mail.de';
    const password = '123';
    const fakeToken = 'faketoken';

    service.login(email, password).subscribe();

    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/users/authenticate`
    );

    request.flush({
      token: fakeToken,
    });

    const storedUser = localStorage.getItem('currentUser');

    expect(storedUser).not.toBeNull();

    const storedUserJson = JSON.parse(storedUser!);

    expect(storedUserJson['token']).toEqual(fakeToken);
  });

  it('currentUserValue should contain current user after authenticate', () => {
    const email = 'test@mail.de';
    const password = '123';
    const fakeToken = 'faketoken';

    service.login(email, password).subscribe();

    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/users/authenticate`
    );

    request.flush({
      token: fakeToken,
    });

    const value = service.currentUserValue;

    expect(value).not.toBeNull();
    expect(value!['email']).toEqual(email);
    expect(value!['token']).toEqual(fakeToken);
  });

  it('should remove current user on logout', () => {
    const email = 'test@mail.de';
    const password = '123';
    const fakeToken = 'faketoken';

    service.login(email, password).subscribe();

    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/users/authenticate`
    );

    request.flush({
      token: fakeToken,
    });

    service.logout();

    const storedUser = localStorage.getItem('currentUser');

    expect(storedUser).toBeNull();
  });

  it('currentUserValue should be null after logout', () => {
    const email = 'test@mail.de';
    const password = '123';
    const fakeToken = 'faketoken';

    service.login(email, password).subscribe();

    const request = httpTestingController.expectOne(
      `${environment.apiUrl}/users/authenticate`
    );

    request.flush({
      token: fakeToken,
    });

    service.logout();

    const value = service.currentUserValue;

    expect(value).toBeNull();
  });
});
