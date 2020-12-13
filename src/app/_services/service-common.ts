import { HttpHeaders } from '@angular/common/http';

export function getHeaders(): HttpHeaders {
  return new HttpHeaders({
    'Content-Type': 'application/json',
  });
}

export function getHeadersAuth(email: string, password: string): HttpHeaders {
  return new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Basic ${btoa(email + ':' + password)}`,
  });
}
