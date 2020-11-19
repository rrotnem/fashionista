import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs/operators';
import { ProductService } from 'src/app/admin-portal/product.service';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  flag: boolean = false;
  products: Array<any> = [];
  length: number = 0;
  errors: any = []
  counter: number = 1;
  result: string;
  lists: Array<any> = []
  temps: Array<any> = []



  constructor(public productService: ProductService,
    public router: Router,
    private auth: AuthService,
    private listService: CartService) { }//DI for service class

  ngOnInit(): void {
    this.loadProductInfo();
  }
  loadProductInfo() {
    this.flag = true;
    this.productService.getAllProductDetails().
      subscribe(data => {
        this.products = data;
        this.length = this.products.length;
        this.listService.getAllLists(this.auth.getUserId()).
          subscribe(data => {
            this.temps = data;
            console.log(this.temps)
            for (var i = 0; i < this.temps.length; i++) {

              var productId = this.temps[i].productId;
              for (var j = 0; i < this.products.length; j++) {
                var _id = this.products[j]._id;
                if (productId == _id) {


                  this.lists[i] = this.products[j];
                  break;


                }
              }

            }
            console.log("after go though list" + this.lists)

          },
            (errorResponse) => {
              this.errors.push(errorResponse.error.error);
            });
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });

  }

  addCart(id) {

    console.log(this.auth.isAuthenticated)

    if (this.auth.isAuthenticated) {
      if (localStorage.getItem('cart') == null) {
        let cart: any = [];
        let item = {
          product: this.findProduct(id),
          quantity: 1
        }


        cart.push(JSON.stringify(item));
        console.log("first time" + cart)
        localStorage.setItem('cart', JSON.stringify(cart));

      } else {
        let cart: any = JSON.parse(localStorage.getItem('cart'));
        console.log("secondtime" + cart)

        let index: number = -1;
        for (var i = 0; i < cart.length; i++) {
          let item: any = JSON.parse(cart[i]);
          if (item.product._id === id) {
            index = i;
            break;
          }
        }
        if (index == -1) {
          let item = {
            product: this.findProduct(id),
            quantity: 1
          }
          cart.push(JSON.stringify(item));
          localStorage.setItem('cart', JSON.stringify(cart));

        } else {
          let item: any = JSON.parse(cart[index]);
          item.quantity += 1;
          console.log(item)
          cart[index] = JSON.stringify(item);
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
      alert("Item Add Successfully")
    } else {
      alert("Please log in first")
    }

  }

  findProduct(id) {

    return this.products[this.getSelectedIndex(id)]
  }

  private getSelectedIndex(id) {
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i]._id == id) {
        return i;
      }
    }
    return -1;
  }


  addWishList(id) {
    console.log(id)
    var inList: boolean = true;
    for (var i = 0; i < this.lists.length; i++) {    
      if (id == this.lists[i]._id) {
        inList = false;
        this.result="* Product is already in wishlist."
        break;
      }
    }

    if (inList) {

      var list = {
        productId: id,
        userId: this.auth.getUserId()
      }
      console.log(list)
      this.listService.addWishlist(list).
        subscribe(data => {
          this.result = "*Product is added"       
          this.router.navigate(['/home/cart'], { queryParams: { deleted: 'success' } });
        },
          (errorResponse) => {
            this.errors.push(errorResponse.error.error);
          });
    }

  }

  getAllList() {
    var id = this.auth.getUserId();
    this.listService.getAllLists(id).
      subscribe(data => {
        this.temps = data;
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });

  }
  getLists() {
   this.loadProductInfo()
  }


}

