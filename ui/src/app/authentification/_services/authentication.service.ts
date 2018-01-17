import { Injectable } from '@angular/core';
import {  HttpHeaders } from '@angular/common/http';
import {AuthAPI} from "./index";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { environment } from '../../../environments/environment';
import { Sign_up_message} from '../_models/index'
import {parseHttpResponse} from "selenium-webdriver/http";

@Injectable()
export class AuthenticationService {
    public token: string;
    constructor(private authapi: AuthAPI) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    sign_in(email: string, password: string,remember_me: boolean): Observable<boolean> {
        return this.authapi.jsonRequest(environment.sign_in,{ email: email, password: password, rememberMe: remember_me }).map(data =>{
                let token = data['details'];
                console.log(data);
                console.log(token);
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: email, token: token }));

                    // return true to indicate successful sign_in
                    return true;
                } else {
                    // return false to indicate failed sign_in
                    return false;
                }
        });
    }
    sign_up(username: string,email: string,password: string): Observable<Sign_up_message>{
        return this.authapi.jsonRequest(environment.sign_up,{name: username,email: email, password: password }).map(data =>{
            console.log(data);
            let Response=new Sign_up_message();
            Response.message=data.description;
            Response.success=data.code=="auth.signUp.successful";
            return Response;
        });
    }
    sign_out(): Observable<boolean>{
        return this.authapi.jsonRequest(environment.sign_out,"test").map(data =>{
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