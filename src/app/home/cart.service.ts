import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../admin-portal/product.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private uriseg = 'http://localhost:5000/api/wishList';


  constructor(public httpClient:HttpClient, 
  ) {

   }   // DI for HttpClient

  addWishlist(list):Observable<any[]> {
    const URI = this.uriseg + '/addList';
    return this.httpClient.post<any[]>(URI,list);
  }
  getAllLists(id):Observable<any[]> {
    const URI = this.uriseg + '/getLists/';
    return this.httpClient.get<any[]>(URI+id);
  }

}