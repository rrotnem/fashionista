import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  result: string = "";
  cart: any = []
  total: number;

  constructor(public router:Router,public auth:AuthService) { }

  ngOnInit(): void {
    this.loadCart()
  }

  loadCart() {
    this.cart=[]
    if (localStorage.getItem('cart') == null) {
      this.result = "Cart is Empty"

    } else {


      this.total = 0;

      let cart = JSON.parse(localStorage.getItem('cart'));
      for (var i = 0; i < cart.length; i++) {
        let item = JSON.parse(cart[i]);
        this.cart.push({
          product: item.product,
          quantity: item.quantity
        });
        this.total += item.product.price * item.quantity;
        console.log("total"+this.total)
      }
    }
  }

  remove(id) {
    console.log("inside")
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		for (var i = 0; i < cart.length; i++) {
      console.log("inside loop")
			let item: any = JSON.parse(cart[i]);
			if (item.product._id == id) {
        console.log(cart)
        cart.splice(i, 1);
        console.log(cart)
				break;
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();

	}
	


  add(id):void{
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
    if(index != -1){
      let item: any = JSON.parse(cart[index]);
      item.quantity += 1;
      console.log(item)
      cart[index] = JSON.stringify(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      this.loadCart();
      this.router.navigate(['/home/cart'], { queryParams: { added: 'success' } });
    }
  }

  reduce(id):void{
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
    if(index != -1){
      let item: any = JSON.parse(cart[index]);
      item.quantity -= 1;
      console.log(item)
      cart[index] = JSON.stringify(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      this.loadCart();
      this.router.navigate(['/home/cart'], { queryParams: { added: 'success' } });
    }
  }





}

