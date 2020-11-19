import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productRef = new FormGroup({
    id:new FormControl(),
    title:new FormControl(),
    description:new FormControl(),
    manufacturer:new FormControl(),
    department:new FormControl(),
    price: new FormControl(),
    quantity:new FormControl(),
    url:new FormControl(),    
  })
  errors:any=[]
    constructor(public productService:ProductService,public router:Router) { }//DI for Service layer 
    result:string;
    ngOnInit(): void {
    }
  
    storeProductDetails(): void {
      console.log(this.productRef.value);
      this.productService.storeProduct(this.productRef.value).
      subscribe(() => {
        this.router.navigate(['/admin/products'], { queryParams: { registered: 'success' } });
       },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
    }

    cancel(){
      this.router.navigate(['/admin/products'], { queryParams: { registered: 'success' } });
    }

   
  
  }
  