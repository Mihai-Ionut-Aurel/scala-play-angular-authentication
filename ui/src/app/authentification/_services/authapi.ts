
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {APIResponse, APIError} from "../_models/index";
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/**
 * Provides helpers for the API implementations.
 */

@Injectable()
export class AuthAPI {

    /**
     * The default error message which will be displayed in production mode for an unexpected error.
     */
    errorMsg = 'An error occurred, please try again later!';

    constructor( private cookieService: CookieService, private http: HttpClient ) { }


    /**
     * Executes a request without a body.
     *
     * @param route  The API route.
     * @param method The request method.
     * @return A resolved or rejected Observable containing an API result.
     * @see http://www.redotheweb.com/2015/11/09/api-security.html
     */
    request(route: string):Observable<APIResponse> {
        console.log("request")
        return this.statusHandler(this.http.get(`${environment.auth_api}/${route}`, {
        observe: 'response',
        }));
    }

    /**
     * Executes a request with a JSON body.
     *
     * @param route The API route.
     * @param json  The JSON data to post.
     * @param method The request method.
     * @return A resolved or rejected promise containing an API result.
     * @see http://www.redotheweb.com/2015/11/09/api-security.html
     */
    jsonRequest(route: string, json: any): Observable<APIResponse> {
        return this.statusHandler(this.http.post(`${environment.auth_api}/${route}`,
            JSON.stringify(json),
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    Accept: 'application/json',
                },
                observe: 'response',
        }));
    }

    /**
     * Executes a request with a application/x-www-form-urlencoded or multipart/form-data body.
     *
     * @param route  The API route.
     * @param body   The body to post.
     * @param method The request method.
     * @return A resolved or rejected promise containing an API result.
     * @see http://www.redotheweb.com/2015/11/09/api-security.html
     */
    formRequest(route: string, body: any): Observable<APIResponse> {
        return this.statusHandler(this.http.post(`${environment.auth_api}/${route}`,
            body,
            {
                observe: 'response',
        }));
    }

    /**
     * Handles the status of a response in a unified manner.
     *
     * @param observable The result from a fetch call.
     * @return A resolved or rejected promise containing an API result.
     */
    statusHandler(observable: Observable<any>): Observable<APIResponse> {
        const self = this;
        return observable.map((response) => {
            //console.log("Headers:"+ JSON.stringify(response.headers.get('X-Auth-Token')))
            console.log("Response:" +JSON.stringify(response))
            // We return a resolved promise with the APIResponse for all 2xx status codes
                return response.body;
        }).catch((e: any) => {
            // If the exception is already an APIError then we throw it again
            console.log(e)
            if (e.response !== undefined) {
                throw e;
            }
            // We return a rejected promise for all 4xx errors
            if (e.status >= 400 && e.status <= 499) {
                throw(new APIError(e.json))
            }
            const msg = environment.production === true  ? self.errorMsg : `Cannot process request; Got exception: ${e.message}`;
            throw (new APIError(new APIResponse('fatal.error', msg)));
        });

    }
}
