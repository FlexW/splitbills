import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor } from './jwt.interceptor';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
class TestService {
  constructor(private http: HttpClient) {}

  doRequest() {
    return this.http.get(`${environment.apiUrl}/test`);
  }
}

describe('JwtInterceptor', () => {
  let service: TestService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TestService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true,
        },
      ],
    });

    localStorage.setItem('currentUser', '{"email":"mail","token":"token"}');
    service = TestBed.inject(TestService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should add an Authorization header', () => {
    service.doRequest().subscribe((response) => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpTestingController.expectOne(
      `${environment.apiUrl}/test`
    );
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toEqual(
      'Bearer token'
    );
  });
});
