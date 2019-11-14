import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountService} from './account.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private service: AccountService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercepted http request. Trying to get ' + req.url);
    const token = this.service.getToken();
    if (token && !req.url.startsWith('auth/')) {
      console.log('Authorization header was added');
      req.headers.append('Authorization', `Bearer ${token}`);
    }
    return next.handle(req);
  }
}
