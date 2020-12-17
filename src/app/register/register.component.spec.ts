import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterService } from '../_services';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let router: jasmine.SpyObj<Router>;
  let registerService: jasmine.SpyObj<RegisterService>;
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    registerService = jasmine.createSpyObj('RegisterService', ['register']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatIconModule],
      declarations: [RegisterComponent],
      providers: [
        FormBuilder,
        { provide: RegisterService, useValue: registerService },
        { provide: Router, useValue: router },
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    registerService = TestBed.inject(
      RegisterService
    ) as jasmine.SpyObj<RegisterService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit() should call register()', () => {
    registerService.register.and.returnValue(of({}));

    const lastName = 'Maler';
    const firstName = 'Monika';
    const email = 'maler@handwerker.de';
    const password = 'IchBinEinPasswort12!';
    const passwordRepeat = 'IchBinEinPasswort12!';

    const controls = component.registerForm.controls;

    controls['lastName'].setValue(lastName);
    controls['firstName'].setValue(firstName);
    controls['email'].setValue(email);
    controls['password'].setValue(password);
    controls['passwordRepeat'].setValue(passwordRepeat);

    component.onSubmit();

    expect(registerService.register.calls.count()).toBe(1);
    expect(router.navigate.calls.count()).toBe(1);

    const args = registerService.register.calls.argsFor(0);
    expect(args[0]).toEqual(lastName);
    expect(args[1]).toEqual(firstName);
    expect(args[2]).toEqual(email);
    expect(args[3]).toEqual(password);
  });

  describe('onSubmit() should NOT call register()', () => {
    it('passwords are different', () => {
      registerService.register.and.returnValue(of({}));

      const lastName = 'Maler';
      const firstName = 'Monika';
      const email = 'maler@handwerker.de';
      const password = 'IchBinEinPasswort12!';
      const passwordRepeat = 'IchBinEinPasswort123!';

      const controls = component.registerForm.controls;

      controls['lastName'].setValue(lastName);
      controls['firstName'].setValue(firstName);
      controls['email'].setValue(email);
      controls['password'].setValue(password);
      controls['passwordRepeat'].setValue(passwordRepeat);

      component.onSubmit();

      expect(registerService.register.calls.count()).toBe(0);
      expect(router.navigate.calls.count()).toBe(0);
    });

    it('no special character', () => {
      registerService.register.and.returnValue(of({}));

      const lastName = 'Maler';
      const firstName = 'Monika';
      const email = 'maler@handwerker.de';
      const password = 'IchBinEinPasswort';
      const passwordRepeat = 'IchBinEinPasswort';

      const controls = component.registerForm.controls;

      controls['lastName'].setValue(lastName);
      controls['firstName'].setValue(firstName);
      controls['email'].setValue(email);
      controls['password'].setValue(password);
      controls['passwordRepeat'].setValue(passwordRepeat);

      component.onSubmit();

      expect(registerService.register.calls.count()).toBe(0);
      expect(router.navigate.calls.count()).toBe(0);
    });

    it('no upper case', () => {
      registerService.register.and.returnValue(of({}));

      const lastName = 'Maler';
      const firstName = 'Monika';
      const email = 'maler@handwerker.de';
      const password = 'ichbineinpasswort!';
      const passwordRepeat = 'ichbineinpasswort!';

      const controls = component.registerForm.controls;

      controls['lastName'].setValue(lastName);
      controls['firstName'].setValue(firstName);
      controls['email'].setValue(email);
      controls['password'].setValue(password);
      controls['passwordRepeat'].setValue(passwordRepeat);

      component.onSubmit();

      expect(registerService.register.calls.count()).toBe(0);
      expect(router.navigate.calls.count()).toBe(0);
    });

    it('passwords are different is displayed', () => {
      registerService.register.and.returnValue(of({}));

      const lastName = 'Maler';
      const firstName = 'Monika';
      const email = 'maler@handwerker.de';
      const password = 'IchBinEinPasswort12!';
      const passwordRepeat = 'IchBinEinPasswort123!';

      const controls = component.registerForm.controls;

      controls['lastName'].setValue(lastName);
      controls['firstName'].setValue(firstName);
      controls['email'].setValue(email);
      controls['password'].setValue(password);
      controls['passwordRepeat'].setValue(passwordRepeat);

      component.onSubmit();
      fixture.detectChanges();

      const registerElement: HTMLElement = fixture.nativeElement;
      const matError = registerElement.querySelector('#error-password-repeat');

      expect(matError?.textContent).toEqual('Passwords are different');
    });

    it('"passwords needs upper case" is displayed', () => {
      registerService.register.and.returnValue(of({}));

      const lastName = 'Maler';
      const firstName = 'Monika';
      const email = 'maler@handwerker.de';
      const password = 'ichbineinpasswort123!';
      const passwordRepeat = 'ichbineinpasswort123!';

      const controls = component.registerForm.controls;

      controls['lastName'].setValue(lastName);
      controls['firstName'].setValue(firstName);
      controls['email'].setValue(email);
      controls['password'].setValue(password);
      controls['passwordRepeat'].setValue(passwordRepeat);

      component.onSubmit();
      fixture.detectChanges();

      const registerElement: HTMLElement = fixture.nativeElement;
      const matError = registerElement.querySelector('#error-password');

      expect(matError?.textContent).toEqual(
        'Please enter a password with minimum one upper case and a special character'
      );
    });

    it('"passwords needs special char" is displayed', () => {
      registerService.register.and.returnValue(of({}));

      const lastName = 'Maler';
      const firstName = 'Monika';
      const email = 'maler@handwerker.de';
      const password = 'Ichbineinpasswort123';
      const passwordRepeat = 'Ichbineinpasswort123';

      const controls = component.registerForm.controls;

      controls['lastName'].setValue(lastName);
      controls['firstName'].setValue(firstName);
      controls['email'].setValue(email);
      controls['password'].setValue(password);
      controls['passwordRepeat'].setValue(passwordRepeat);

      component.onSubmit();
      fixture.detectChanges();

      const registerElement: HTMLElement = fixture.nativeElement;
      const matError = registerElement.querySelector('#error-password');

      expect(matError?.textContent).toEqual(
        'Please enter a password with minimum one upper case and a special character'
      );
    });
  });
});
