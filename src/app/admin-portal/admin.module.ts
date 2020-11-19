import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdminPortalComponent } from './admin-portal.component';
import { ProductsComponent } from './products/products.component';
import { ProductService } from './product.service';
import { AddProductComponent } from './add-product/add-product.component';

import { EditProductComponent } from './edit-product/edit-product.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminPortalComponent,
    children: [
      { path: 'products', component: ProductsComponent,canActivate: [AuthGuard] },
      { path: 'addProduct', component: AddProductComponent,canActivate: [AuthGuard]  },
      { path: 'editProduct', component: EditProductComponent,canActivate: [AuthGuard]  },
      { path: 'users', component: UsersComponent,canActivate: [AuthGuard]  },


    ]
  },
  
];

@NgModule({
  declarations: [
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    UsersComponent
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
export class AdminModule { }
