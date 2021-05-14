import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../_services';
import { LogService } from '../_services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerError = false;
  registerErrorMessage = 'Verify your inputs';
  passwordErrorMessage = '';

  isAlpha(input: string): boolean {
    return /^[\x41-\x5A][\x61-\x7A]*$/.test(input);
  }

  hasUpperCase(input: string): boolean {
    for (let i = 0; i < input.length; i++) {
      if (input[i] === input[i].toUpperCase() && this.isAlpha(input[i])) {
        return true;
      }
    }
    return false;
  }

  hasSpecialCharacter(input: string): boolean {
    const specialCharacters = [
      '!',
      '@',
      '#',
      '$',
      '%',
      '^',
      '&',
      '*',
      '(',
      ')',
      '-',
      '+',
      '.',
      ':',
      '_',
      '<',
      '>',
      '§',
      '/',
    ];
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < specialCharacters.length; j++) {
        if (input[i] === specialCharacters[j]) {
          return true;
        }
      }
    }
    return false;
  }

  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private logService: LogService
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.registerError = false;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.passwordErrorMessage = 'Please enter a password';
      return;
    }

    const controls = this.registerForm.controls;

    const lastName = controls.lastName.value;
    const firstName = controls.firstName.value;
    const email = controls.email.value;
    const password = controls.password.value;
    const passwordRepeat = controls.passwordRepeat.value;

    if (!this.hasUpperCase(password) || !this.hasSpecialCharacter(password)) {
      this.passwordErrorMessage =
        'Please enter a password with minimum one upper case and a special character';
      this.registerForm.controls['password'].setErrors({ incorrect: true });
      return;
    }

    if (password != passwordRepeat) {
      this.passwordErrorMessage = 'Passwords are different';
      this.registerForm.controls['passwordRepeat'].setErrors({
        incorrect: true,
      });
      this.registerForm.controls['password'].setErrors({ incorrect: true });
      return;
    }

    this.logService.debug(
      'RegisterComponent',
      `Register with first name ${firstName}, last name ${lastName} and email ${email}`
    );

    this.registerService
      .register(firstName, lastName, email, password)
      .pipe(first())
      .subscribe(
        () => {
          this.logService.info('RegisterComponent', `Registration successful`);
          this.registerForm.reset();

          this.router.navigate(['/']);
        },
        (error) => {
          this.logService.info(
            'RegisterComponent',
            `Registration failed`,
            error
          );

          this.registerError = true;
          this.registerErrorMessage = error.error.message;
        }
      );
  }

  getFirstNameErrorMessage(): string {
    const firstName = this.registerForm.controls.firstName;
    if (firstName.hasError('required')) {
      return 'Please enter your first name';
    }
    return '';
  }
  getLastNameErrorMessage(): string {
    const lastName = this.registerForm.controls.lastName;
    if (lastName.hasError('required')) {
      return 'Please enter your last name';
    }
    return '';
  }
  getEmailErrorMessage(): string {
    const email = this.registerForm.controls.email;

    if (email.hasError('required')) {
      return 'You must enter a email';
    } else if (email.hasError('email')) {
      return 'Not a valid email';
    }

    return '';
  }
  getPasswordErrorMessage(): string {
    return this.passwordErrorMessage;
  }
  getPasswordRepeatErrorMessage(): string {
    return this.passwordErrorMessage;
  }
  getRegisterErrorMessage(): string {
    return this.registerErrorMessage;
  }

  ngOnInit(): void {
    // Empty
  }
}
