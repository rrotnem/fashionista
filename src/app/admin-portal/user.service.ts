import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private uriseg = 'http://localhost:5000/api/users';


  constructor(public httpClient:HttpClient) { }   // DI for HttpClient

  getAllUsers():Observable<any[]> {
    const URI = this.uriseg + '/client/users';
    return this.httpClient.get<any[]>(URI);
  }
  deleteUserById(prodId):Observable<any>{
    const URI = this.uriseg + '/client/deleteUserById/';
  return this.httpClient.delete(URI+prodId);
  }
  updateUser(user):Observable<any>{
    console.log(user)
    const URI = this.uriseg + '/client/updateUser';
  return this.httpClient.put(URI, user);
  }
  public register(userData: any): Observable<any> {
    const URI = "http://localhost:5000/api/users"+ '/register';
    return this.httpClient.post(URI, userData);
  }
}