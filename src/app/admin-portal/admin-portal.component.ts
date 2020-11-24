import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ProductService } from './product.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {
  error:string;
  isProduct:boolean = false;
 


    constructor(private auth: AuthService,private userService: UserService, private router:Router) { }//DI for Service layer 

    ngOnInit( ): void {
      this.toProducts()
      
    }

    isAuthentication(){
      this.userService.getAuthentication().subscribe(data =>{
        this.isProduct = false;
        this.router.navigate(['/admin/users'], { queryParams: { access: 'success' } });
      },
       (errorResponse) => {
         this.error = errorResponse.error.error;
       });

  

    }

    toProducts(){
      this.userService.getAuthentication().subscribe(data =>{
        this.isProduct = true;
        this.router.navigate(['/admin/products'], { queryParams: { access: 'success' } });
      },
       (errorResponse) => {
         this.error = errorResponse.error.error;
         this.router.navigate(['/auth/login'], { queryParams: { access: 'success' } });
       });
      

    }
  
  }
  