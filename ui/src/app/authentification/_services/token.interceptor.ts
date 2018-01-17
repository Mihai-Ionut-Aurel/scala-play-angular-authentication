import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private cookieService: CookieService) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Attach token");
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let Headers=request.headers;
        Headers.append('credentials', 'include')
        let token = currentUser && currentUser.token;
        console.log("Token:" ,token)
        if (token) {
            Headers.append('Authorization', 'Bearer '+token)
        }

        if(this.cookieService.check(environment.csrfCookieName))
        {
            Headers.append('Csrf-Token', this.cookieService.get(environment.csrfCookieName));

        }
        request = request.clone({
            headers: Headers,
        });
       // ': Cookies.get()[config.csrfCookieName]
        return next.handle(request);
    }
}