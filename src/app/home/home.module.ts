import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home.component';
import { DisplayComponent } from './display/display.component';
import { ProductService } from '../admin-portal/product.service';
import { AuthGuard } from '../auth/auth.guard';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'display', component: DisplayComponent },
      { path: 'cart', component: CartComponent,canActivate: [AuthGuard] },    
      { path: 'checkout', component: CheckoutComponent,canActivate: [AuthGuard] },    ]
  }
];

@NgModule({
  declarations: [
     HomeComponent,
     DisplayComponent,
     CartComponent,
     CheckoutComponent

  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [ProductService]
})
export class HomeModule { }
