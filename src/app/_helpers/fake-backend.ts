import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

interface User {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
}
const users = [
  {
    id: 1,
    firstName: 'Max',
    lastName: 'Muster',
    email: 'muster@mail.de',
    password: 'secret',
  },
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // wrap in delayed observable to simulate server api call
    return (
      of(null)
        .pipe(mergeMap(handleRoute))
        // call materialize and dematerialize to ensure delay even if an
        // error is thrown
        // (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize())
    );

    function handleRoute(): Observable<HttpEvent<unknown>> {
      switch (true) {
        case request.url.endsWith('/users/authenticate') &&
          request.method === 'POST':
          return authenticate();

        case request.url.endsWith('/users') && request.method == 'POST':
          return register();

        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate(): Observable<HttpEvent<unknown>> {
      const headers = request.headers;

      const auth = headers.get('Authorization');

      const user = users.find((user) => {
        const actual = `Basic ${btoa(user.email + ':' + user.password)}`;
        return auth === actual;
      });
      if (!user) return error('Email or password is incorrect');
      return ok({
        token: 'fake-jwt-token',
      });
    }

    function register(): Observable<HttpEvent<unknown>> {
      const body = request.body as User;
      const user = {
        id: users.length + 1,
        lastName: body.lastName,
        firstName: body.firstName,
        email: body.email,
        password: body.password,
      };

      // TODO: Validate data
      users.push(user);

      return ok({
        message: 'Created user.',
        user: { id: user.id },
      });
    }

    // helper functions

    function ok(body?: unknown) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: unknown) {
      return throwError({ error: { message } });
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
