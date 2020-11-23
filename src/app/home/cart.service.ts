import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../admin-portal/product.service';
import { UserService } from '../admin-portal/user.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private uriseg = 'http://localhost:5000/api/wishList';


  constructor(public router: Router, private userService: UserService,public httpClient:HttpClient, 
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
  removeList(id):Observable<any[]> {
  
    const URI = this.uriseg + '/deleteList/';
    return this.httpClient.delete<any[]>(URI + id);
  }

  getAuthentication(){
    this.userService.getAuthentication().subscribe(data =>{
      this.router.navigate(['/admin/products'], { queryParams: { access: 'notAuthorized Access' } });
    },
     (errorResponse) => {
     
       this.router.navigate(['/home/display'], { queryParams: { access: 'success' } });
     });
    

  }

}