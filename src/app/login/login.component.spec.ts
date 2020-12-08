import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationService: jasmine.SpyObj<AuthenticationService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    authenticationService = jasmine.createSpyObj('AuthenticationService', [
      'login',
    ]);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: AuthenticationService, useValue: authenticationService },
        { provide: Router, useValue: router },
      ],
      // Ignore routerLink Errors
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    authenticationService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit() should call login', () => {
    const email = 'mail@mail.de';
    const password = '123';
    authenticationService.login.and.returnValue(of({ token: 'fake-token' }));

    const controls = component.loginForm.controls;
    controls['email'].setValue(email);
    controls['password'].setValue(password);

    component.onSubmit();

    expect(authenticationService.login.calls.count()).toBe(1);

    const args = authenticationService.login.calls.argsFor(0);
    expect(args[0]).toEqual(email);
    expect(args[1]).toEqual(password);
  });

  it('onSubmit() should return to home after succesful login', () => {
    const email = 'mail@mail.de';
    const password = '123';
    authenticationService.login.and.returnValue(of({ token: 'fake-token' }));

    const controls = component.loginForm.controls;
    controls['email'].setValue(email);
    controls['password'].setValue(password);

    component.onSubmit();

    expect(router.navigate.calls.count()).toBe(1);

    const args = router.navigate.calls.argsFor(0);
    expect(args[0]).toEqual(['/']);
  });

  it('onSubmit() should not call login with invalid data', () => {
    const email = '';
    const password = '';
    authenticationService.login.and.returnValue(of({ token: 'fake-token' }));

    const controls = component.loginForm.controls;
    controls['email'].setValue(email);
    controls['password'].setValue(password);

    component.onSubmit();

    expect(authenticationService.login.calls.count()).toBe(0);
    expect(router.navigate.calls.count()).toBe(0);
  });
});
