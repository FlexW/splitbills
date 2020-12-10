import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  registerError = false;
  registerErrorMessage = 'Verify your inputs';

  hidePassword = true;

  constructor(
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

    // try to login user
    const controls = this.registerForm.controls;

    const lastName = controls.lastName.value;
    const firstName = controls.firstName.value;
    const email = controls.email.value;
    const password = controls.password.value;

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
    return '';
  }
  getLastNameErrorMessage(): string {
    return '';
  }
  getEmailErrorMessage(): string {
    return '';
  }
  getPasswordErrorMessage(): string {
    return '';
  }
  getPasswordRepeatErrorMessage(): string {
    return '';
  }
  getRegisterErrorMessage(): string {
    return '';
  }

  ngOnInit(): void {
    // Empty
  }
}
