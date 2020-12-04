import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ForgotPwComponent } from './forgot-pw/forgot-pw.component';
import { HomeComponent } from './home';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPwComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  //   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  //   fakeBackendProvider
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
