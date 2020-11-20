import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {
  error:string;
  isProduct:boolean = true;


    constructor(private userService: UserService, private router:Router) { }//DI for Service layer 

    ngOnInit( ): void {
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
      this.isProduct = true;
      this.router.navigate(['/admin/products'], { queryParams: { access: 'success' } });

    }
  
  }
  