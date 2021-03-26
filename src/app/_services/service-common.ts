import { HttpHeaders } from '@angular/common/http';

export function getHeaders(): HttpHeaders {
  return new HttpHeaders({
    'Content-Type': 'application/json',
  });
}

export function getHeadersAuth(token: string): HttpHeaders {
  return new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
}
