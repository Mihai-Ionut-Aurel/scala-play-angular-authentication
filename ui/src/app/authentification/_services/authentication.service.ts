import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { environment } from '../../../environments/environment';
import { Sign_up_message} from '../_models/index'
import {parseHttpResponse} from "selenium-webdriver/http";
@Injectable()
export class AuthenticationService {
    public token: string;
    constructor(private http: HttpClient) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    sign_in(email: string, password: string,remember_me: boolean): Observable<boolean> {
        let Headers= new HttpHeaders().set('Content-Type', 'application/json');
        Headers.append('Accept', 'application/json');
        return this.http.post<boolean>(environment.auth_api+environment.sign_in,JSON.stringify({ email: email, password: password, rememberMe: remember_me }),
            { headers: Headers,}).map(data =>{
            console.log(data);
            return true;
        });
    }
    sign_up(username: string,email: string,password: string): Observable<Sign_up_message>{
        console.log(JSON.stringify( {name: username,email: email, password: password }));


        // Begin assigning parameters

        let Headers= new HttpHeaders().set('Content-Type', 'application/json');
        Headers.append('Accept', 'application/json');
        return this.http.post<Sign_up_message>(environment.auth_api+environment.sign_up,JSON.stringify({name: username,email: email, password: password }),{
            headers: Headers,
        }).map(data =>{
            console.log(data);
            let Response=new Sign_up_message();
            Response.message=data["description"];
            Response.success=data["code"]=="auth.signUp.successful";
            return Response;
        });
    }
    sign_out(): Observable<boolean>{
        return this.http.post<boolean>(environment.auth_api+environment.sign_out,"test").map(data =>{
            console.log(data);
            return true;
        });
    }

    // sign_in(username: string, password: string): Observable<boolean> {
    //     return this.http.post('/api/auth/sign-in', JSON.stringify({ username: username, password: password }))
    //         .map((response: Response) => {
    //             // sign_in successful if there's a jwt token in the response
    //             let token = response.json() && response.json().token;
    //             if (token) {
    //                 // set token property
    //                 this.token = token;
    //
    //                 // store username and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
    //
    //                 // return true to indicate successful sign_in
    //                 return true;
    //             } else {
    //                 // return false to indicate failed sign_in
    //                 return false;
    //             }
    //         });
    // }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}