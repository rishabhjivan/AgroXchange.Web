import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/shareReplay';

import { User } from './../../shared/models/api/user';
import { Login } from './../../shared/models/view/login';
import { Config } from './../../shared/services/config';
import { AuthToken } from '../../shared/models/api/auth-token';
import { Register } from '../../shared/models/view/register';

@Injectable()
export class AuthService {

  private user;
  private cachedRequests: Array<HttpRequest<any>> = [];
  constructor(private http: HttpClient) { }

  getUser() {
    return <User>JSON.parse(localStorage.getItem("AuthUser"));
  }

  public async signIn(login: Login): Promise<any> {
    const url = `${Config.API_ENDPOINT}users/authenticate`;
    var res = await new Promise((resolve, reject) => {
      let response = this.http.post<AuthToken>(url, login).shareReplay();
      response.subscribe(
        res => {
          localStorage.setItem("AuthToken", res.token);
          this.user = res.user;
          localStorage.setItem("AuthUser", JSON.stringify(this.user));
          resolve(this.user);
        },
        err => {
          reject(err.error.message);
        }
      );
    }) as any;
    return res;
  }

  signOut() {
    localStorage.removeItem("AuthUser");
    localStorage.removeItem("AuthToken");
  }

  public async registerUser(newUser: Register): Promise<any> {
    const url = `${Config.API_ENDPOINT}users`;
    var res = await new Promise((resolve, reject) => {
      let response = this.http.post<AuthToken>(url, newUser).shareReplay();
      response.subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err.error.message);
        }
      );
    }) as any;
    return res;
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

}
