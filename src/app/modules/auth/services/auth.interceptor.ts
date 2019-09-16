import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = localStorage.getItem("AuthToken");

    if (authToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
            "Bearer " + authToken)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
