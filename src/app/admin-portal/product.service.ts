import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private uriseg = 'http://localhost:5000/api/products';
  


  constructor(public httpClient:HttpClient) { }   // DI for HttpClient

  getAllProductDetails():Observable<any[]> {
    const URI = this.uriseg + '/products';
    return this.httpClient.get<any[]>(URI);
  }

  storeProduct(prodRef): Observable<any> {
      const URI = this.uriseg + '/addProduct';
      console.log(prodRef)
      return this.httpClient.post(URI, prodRef);
  }

  deleteProductById(prodId):Observable<any>{
    const URI = this.uriseg + '/deleteProductById/';
  return this.httpClient.delete(URI+prodId);
  }
  getProductById(prodId):Observable<any>{
    const URI = this.uriseg + '/getProductById/';
  return this.httpClient.get(URI+prodId);
  }
  updateProduct(prodRef):Observable<any> {
    const URI = this.uriseg + '/updateProduct';
    console.log("date in product service"+ prodRef);
    return this.httpClient.put(URI,prodRef);
  }
}
export class Product {
  constructor(public _id:number,public pname:string,public price:number){}
}