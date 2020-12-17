import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_helpers';

import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { BillsComponent } from './bills/bills.component';
import { OverviewComponent } from './overview/overview.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GroupsComponent } from './groups/groups.component';

const routes: Routes = [
  { path: '', component: OverviewComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'bills', component: BillsComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'groups', component: GroupsComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
