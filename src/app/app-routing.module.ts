import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_helpers';

import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { BillsComponent } from './bills/bills.component';
import { OverviewComponent } from './overview/overview.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GroupsComponent } from './groups/groups.component';
import { AddGroupComponent } from './add-group/add-group.component';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'groups',
        pathMatch: 'full',
        component: GroupsComponent,
      },
      {
        path: 'bills',
        pathMatch: 'full',
        component: BillsComponent,
      },
      {
        path: 'addgroup',
        pathMatch: 'full',
        component: AddGroupComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'welcome', component: WelcomeComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
