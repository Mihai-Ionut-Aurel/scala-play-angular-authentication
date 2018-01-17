import { Injectable } from '@angular/core';
import { AuthAPI} from "./index";
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'


import { User } from '../_models/index';
import {AuthenticationService} from './index'
@Injectable()
export class UserService {
    public user : User;
    constructor(private api: AuthAPI )
    {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(currentUser)
        this.user = new User();

    }
    getUser(): Observable<any>{
        console.log("Get user service")
        return this.api.request(environment.get_user).map(data =>{
            console.log(data)
           if (data["code"]== "auth.user.successful") {

               return data["valid.result"];
           }
           return false
        });
    }
    //
    // getUsers(): Observable<User[]> {
    //     // add authorization header with jwt token
    //     let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    //     let options = new RequestOptions({ headers: headers });
    //
    //     // get users from api
    //     return this.http.get('/api/users', options)
    //         .map((response: Response) => response.json());
    // }
}