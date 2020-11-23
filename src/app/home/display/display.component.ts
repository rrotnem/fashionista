import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
    this.lists=[]

    this.flag = true;
    this.productService.getAllProductDetails().
      subscribe(data => {
        this.products = data;
        this.length = this.products.length;
        if (this.auth.isAuthenticated()) {
          this.listService.getAllLists(this.auth.getUserId()).
            subscribe(data => {
              this.temps = data;
              console.log("temp" + this.temps + this.temps.length)
              console.log("this lists before :" + this.lists.length)
              for (var i = 0; i < this.temps.length; i++) {
                var productId = this.temps[i].productId;
                for (var j = 0; i < this.products.length; j++) {
                  var _id = this.products[j]._id;
                  if (productId == _id) {
                    this.initWishList(this.products[j])
                    break;
                  }
                }

              }
              console.log(this.lists.length)

            },
              (errorResponse) => {
                this.errors.push(errorResponse.error.error);
              });

        }
      },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });


  }

  addCart(id) {

    console.log(this.auth.isAuthenticated)

    if (this.auth.isAuthenticated()) {
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

  initWishList(product) {
    if (this.auth.isAuthenticated()) {
      if (localStorage.getItem('wishlist') == null) {
        let wishlist: any = [];
        let item = {
          product: product,
        }
        wishlist.push(JSON.stringify(item));
        this.lists.push(item)

        localStorage.setItem('wishlist', JSON.stringify(wishlist));

      } else {
        let wishlist: any = JSON.parse(localStorage.getItem('wishlist'));


          let item = {
            product: product,
          }
          wishlist.push(JSON.stringify(item));
          this.lists.push(item)
          localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }    
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
  // wishlist portion actions

  // loadWishList() {
  //   this.lists = []

  //   if (localStorage.getItem('wishlist') == null) {
  //     this.result = "Wishlist is Empty"

  //   } else {

  //     let wishlist = JSON.parse(localStorage.getItem('wishlist'));
  //     for (var i = 0; i < wishlist.length; i++) {
  //       let item: any = JSON.parse(wishlist[i]);
  //       this.lists.push({
  //         product: item.product,
  //       });
  //       console.log(item.product)
  //     }
  //   }
  //   console.log("finished loding...")
  //   for (var i = 0; i < this.lists.length; i++) {

  //     console.log("list after add product:" + this.lists[i].product.title)
  //   }
  // }

  addWishList(id) {
    if(this.auth.isAuthenticated()){

    console.log(id)
    var inList: boolean = true;
    for (var i = 0; i < this.lists.length; i++) {
      if (id == this.lists[i].product._id) {
        inList = false;
        this.result = "* Product is already in wishlist."
        break;
      }
    }

    if (inList && this.auth.isAuthenticated()) {

      var list = {
        productId: id,
        userId: this.auth.getUserId()
      }
      var product = this.findProduct(id)
      console.log(product)
     
      console.log(list)
      this.listService.addWishlist(list).
        subscribe(data => {
          this.result = "*Product is added"
          this.initWishList(product);
          this.router.navigate(['/home/display'], { queryParams: { added: 'success' } });
        },
          (errorResponse) => {
            this.errors.push(errorResponse.error.error);
          });
    }
  }else{
    alert("Please Log in first")
  }

  }

  removeList(id): void {
    if (this.auth.isAuthenticated()) {
      this.listService.removeList(id).subscribe(
        data =>{
          this.result = "Product is removed from Wishlist."
          let wishlist: any = JSON.parse(localStorage.getItem('wishlist'));
          console.log("secondtime" + wishlist)
    
  
          for (var i = 0; i < wishlist.length; i++) {
            let item: any = JSON.parse(wishlist[i]);
            if (item.product._id === id) {
             wishlist.splice(i, 1);
              break;
            }
          }
          for (var i = 0; i < this.lists.length; i++) {
            let item: any = this.lists[i];
            if (item.product._id === id) {
             this.lists.splice(i, 1);
              break;
            }
          }    
    
            localStorage.setItem("wishlist", JSON.stringify(wishlist));            
    
            this.router.navigate(['/home/display'], { queryParams: { deleted: 'success' } });
    
        
        }        
      )
    }



  }



  getLists() {
    this.loadProductInfo()
  }


}

