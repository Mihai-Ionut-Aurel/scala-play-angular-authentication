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
        let Headers=request.headers;

        if(this.cookieService.check(environment.csrfCookieName))
        {
            Headers=Headers.append('Csrf-Token', this.cookieService.get(environment.csrfCookieName));
        }
        request = request.clone({
            headers: Headers,
        });
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(!currentUser)
            return next.handle(request);
        console.log("Attach token user "+JSON.stringify(currentUser));


        let token = currentUser['token'];
        console.log("Token:" + JSON.stringify(token))
        if (token) {
            Headers=Headers.append('X-Auth-Token', token)

        }


       // ': Cookies.get()[config.csrfCookieName]
        request = request.clone({
            headers: Headers,
        });
        console.log("Headers: "+JSON.stringify(request.headers))
        return next.handle(request);
    }
}