import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private uriseg = 'http://localhost:5000/api/admins';


  constructor(public httpClient:HttpClient, private auth: AuthService) { }   // DI for HttpClient

  getAllUsers():Observable<any[]> {
    const URI = this.uriseg + '/allUsers';
    return this.httpClient.get<any[]>(URI);
  }
  getAuthentication():Observable<any[]> {
    let options =      {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('auth_tkn'))
  } ;
    const URI = this.uriseg + '/getAuthentication';
    return this.httpClient.get<any[]>(URI,options);
  }
  deleteUserById(prodId):Observable<any>{
    const URI = this.uriseg + '/deleteUserById/';
  return this.httpClient.delete(URI+prodId);
  }
  updateUser(user):Observable<any>{
    console.log(user)
    const URI = this.uriseg + '/updateUser';
  return this.httpClient.put(URI, user);
  }
  public register(userData: any): Observable<any> {
    console.log("inadmin register")
  
    return this.auth.adminRegister(userData)
  }
}