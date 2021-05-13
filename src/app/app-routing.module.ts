import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_helpers';

import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { BillsComponent } from './bills/bills.component';
import { OverviewComponent } from './overview/overview.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GroupsComponent } from './groups/groups.component';
import { AddBillComponent } from './add-bill/add-bill.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { AddMemberComponent } from './add-member/add-member.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: OverviewComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'bills',
        pathMatch: 'full',
        component: BillsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'groups',
        pathMatch: 'full',
        component: GroupsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'addbill',
        pathMatch: 'full',
        component: AddBillComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'addgroup',
        pathMatch: 'full',
        component: AddGroupComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'addmember',
        pathMatch: 'full',
        component: AddMemberComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
