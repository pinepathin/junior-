import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {StorageService} from "./storage.service";
import EndPoints from "../../utils/routes"

export const AUTH_HEADER = "authorization";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient,
              private storageService: StorageService) { }

  //signupRequest : pass the argument i passed in backend (signupDTO) in the method createUser in SignupController
  signup(signupRequest: any): Observable<any> {
    return this.httpclient.post( EndPoints.SIGNUP , signupRequest)
  }
  /*login(loginRequest: any): Observable<any> {
    return this.httpclient.post(BASIC_URL + "auth", loginRequest)
  }*/

  //get the token from header and set it to storage service (to save the token local storage in the browser)
  login(email:string, password:string): Observable<any> {
    return this.httpclient.post( EndPoints.LOGIN , {
      email,
      password
    },
      {observe: 'response'})
      // to save the token in local storage
      .pipe(
        tap(__=>this.log("user Authentication")),
        map((res: HttpResponse<any>) => {
          this.storageService.saveToken( res.headers.get(AUTH_HEADER));
          this.storageService.saveUser(res.body);
          return res;
        })
      )
  }

 log(message: string) {
    console.log("User Auth Service" + message)
  }
}

