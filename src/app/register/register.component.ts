import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegisterService } from '../_services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerError: boolean = false;
  registerErrorMessage: string = 'Verify your inputs';
  passwordErrorMessage: string =
    'Please enter a password with minimum one upper case and a special character';

  hasUpperCase(input: string) {
    for (let i = 0; i < input.length; i++) {
      if (input[i] === input[i].toUpperCase()) {
        return true;
      }
    }
    return false;
  }

  hasSpecialCharacter(input: string) {
    let specialCharacters = [
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
    private location: Location,
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
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
      return;
    }

    const controls = this.registerForm.controls;

    const lastName = controls.lastName.value;
    const firstName = controls.firstName.value;
    const email = controls.email.value;
    const password = controls.password.value;

    if (!this.hasUpperCase(password) || !this.hasSpecialCharacter(password)) {
      this.registerForm.controls['password'].setErrors({ incorrect: true });
      return;
    }

    this.registerService
      .register(lastName, firstName, email, password)
      .pipe(first())
      .subscribe(
        () => {
          this.registerForm.reset();

          this.router.navigate(['/']);
        },
        (error) => {
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
    return '';
  }
  getRegisterErrorMessage(): string {
    return this.registerErrorMessage;
  }

  ngOnInit(): void {
    // Empty
  }
}
