import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services';
import { LogService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private logService: LogService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // add authorization header with jwt token if available
    const currentUser = this.authenticationService.currentUserValue;

    if (currentUser && currentUser.accessToken) {
      this.logService.debug('JwtInterceptor', 'Add user token');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.accessToken.token}`,
        },
      });
    } else {
      this.logService.debug('JwtInterceptor', 'No user token set');
    }

    return next.handle(request);
  }
}
