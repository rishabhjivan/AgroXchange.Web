import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  isRefreshingToken: boolean = false;

  constructor(public auth: AuthService, private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // success response
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          if (err.error && err.error.detail && err.error.detail == 'Signature has expired.') {
            console.log('Token Expired');
          }
          //this.auth.collectFailedRequest(request);
          this.auth.signOut();
          this.router.navigate(['auth/login']);
        }
      }
    });
  }
}
