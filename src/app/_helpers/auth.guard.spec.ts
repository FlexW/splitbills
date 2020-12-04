import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../_services';

import { AuthGuard } from './auth.guard';

function spyPropertyGetter(spyObj: jasmine.SpyObj<unknown>, propName: string) {
  return Object.getOwnPropertyDescriptor(spyObj, propName)
    ?.get as jasmine.Spy<any>;
}

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  let routerMock: Router;
  let authMock: AuthenticationService;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    authMock = jasmine.createSpyObj('AuthenticationService', [], {
      currentUserValue: {},
    });
    authGuard = new AuthGuard(routerMock, authMock);
  });

  it('should create the guard', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should return true for canActivate() if user logged in', () => {
    spyPropertyGetter(authMock, 'currentUserValue').and.returnValue({});

    const result = authGuard.canActivate(new ActivatedRouteSnapshot(), <
      RouterStateSnapshot
    >{ url: 'testUrl' });

    expect(result).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should return false for canActivate() if user not logged in', () => {
    spyPropertyGetter(authMock, 'currentUserValue').and.returnValue(null);

    const result = authGuard.canActivate(new ActivatedRouteSnapshot(), <
      RouterStateSnapshot
    >{ url: 'testUrl' });

    expect(result).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
