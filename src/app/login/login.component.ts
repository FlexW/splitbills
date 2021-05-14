import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';
import { LogService } from '../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = false;
  loginErrorMessage = 'Email or password wrong';

  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private logService: LogService
  ) {
    // init form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.loginError = false;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // try to login user
    const controls = this.loginForm.controls;

    const email = controls.email.value;
    const password = controls.password.value;

    this.logService.debug('LoginComponent', `Login with email ${email}`);

    this.authenticationService
      .login(email, password)
      .pipe(first())
      .subscribe(
        () => {
          this.loginForm.reset();

          this.router.navigate(['/']);
        },
        (error) => {
          this.logService.info('LoginComponent', 'Login failed', error);
          this.loginError = true;
          this.loginErrorMessage = error.error.message;
        }
      );
  }

  getEmailErrorMessage(): string {
    const email = this.loginForm.controls.email;

    if (email.hasError('required')) {
      return 'You must enter a email';
    } else if (email.hasError('email')) {
      return 'Not a valid email';
    }

    return '';
  }

  getPasswordErrorMessage(): string {
    const password = this.loginForm.controls.password;

    if (password.hasError('required')) {
      return 'You must enter a password';
    }

    return '';
  }

  getLoginErrorMessage(): string {
    return this.loginErrorMessage;
  }
}
