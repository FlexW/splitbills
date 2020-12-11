import { HttpErrorResponse } from '@angular/common/http';
import { throwError, of, Observable } from 'rxjs';

export abstract class RequestError {
  constructor(public message: string) {}
}

/**
 * 404
 */
export class BadRequestError extends RequestError {
  constructor(public message: string = 'Bad request') {
    super(message);
  }
}

/*
 * 401
 */
export class UnauthorizedError extends RequestError {
  constructor(public message: string = 'Authentication failed') {
    super(message);
  }
}

/*
 * 403
 */
export class ForbiddenError extends RequestError {
  constructor(public message: string = 'No permissions') {
    super(message);
  }
}

export class UnknownError extends RequestError {
  constructor(public message: string = 'Unknown error') {
    super(message);
  }
}

export function handleError(
  error: HttpErrorResponse
): Observable<RequestError> {
  switch (error.status) {
    case 401:
      return of(new UnauthorizedError());

    case 403:
      return of(new ForbiddenError());

    case 404:
      return of(new BadRequestError());
  }

  return of(new UnknownError());
}
