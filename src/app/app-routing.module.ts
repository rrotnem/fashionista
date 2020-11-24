
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';

import { AuthGuard } from './auth/auth.guard';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'adminPortal', component: AdminPortalComponent,canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

