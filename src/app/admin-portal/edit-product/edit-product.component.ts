import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  // productRef = new FormGroup({
  //   id:new FormControl(),
  //   title:new FormControl(),
  //   description:new FormControl(),
  //   manufacturer:new FormControl(),
  //   department:new FormControl(),
  //   price: new FormControl(),
  //   quantity:new FormControl(),
  //   url:new FormControl(),    
  // })

  productRef:any={
    id:"",
    title:"",
    description:"",
    manufacturer:"",
    department:"",
    price: "",
    quantity:"",
    url:"",
  }
  errors:any=[];


	constructor(
		private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router:Router
	) { }
  // constructor(public productService:ProductService,public router:Router) { }//DI for Service layer 
    result:string;
    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
      var id = params['id'];
        console.log(id);
        this.getProduct(id);
      })
    }
  
    updateProductDetails(): void {
      console.log("in edit product"+ this.productRef);
      this.productService.updateProduct(this.productRef).
      subscribe(data => {
        console.log("dat" + data);
        this.router.navigate(['/admin/products'], { queryParams: { registered: 'success' } });
       },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
     }

    getProduct(id:string):any{
       this.productService.getProductById(id).
      subscribe(data => {
            this.productRef = data
       console.log(this.productRef)
       },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
    }

    
  }