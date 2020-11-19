import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  flag:boolean = false;
  products: Array<any>;
  length:number = 0;
  errors:any = []
  counter:number = 1;
  result:string;

  constructor(public productService:ProductService, public router:Router) { }//DI for service class

  ngOnInit(): void {
    this.loadProductInfo();
  }
  loadProductInfo(){
    this.flag = true;
    this.productService.getAllProductDetails().
    subscribe(data => {
     this.products = data;
     this.length = this.products.length;
     console.log(this.products)
     },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      });

  }

  deleteProduct(prodId){
    
    this.productService.deleteProductById(prodId).subscribe(data =>{ 
      this.result = data.msg;
      alert(this.result)
      this.loadProductInfo();
      this.router.navigate(['/admin/addProduct'], { queryParams: { deleted: 'success' } });
    },
    (errorResponse)=>{
      this.errors.push(errorResponse.error.error);      
    })
    
  }
}
