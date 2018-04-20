import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as Constants from '../../providers/config'

const API_URL = Constants.API_URL;

@Injectable()
export class ApiServiceProvider {

    headers: Headers;
    api_url: any;

    constructor(public http: Http, public plt: Platform) {
        this.headers = new Headers();
    }

    public getWalkers() {
        return this.get(this.getPath('active'));
    }

    private setAuthorizationHeader() {
        
        let token = localStorage.getItem('token');

        if (this.headers.has('Authorization')) {
            this.headers.set('Authorization', 'Bearer ' + token);
        } else {
            this.headers.append('Authorization', 'Bearer ' + token);
        }

        return this.headers;
    }

    private get(uri, collection = true) {

        // this.headers = this.setAuthorizationHeader();

        return this.http
            .get(uri, { headers: this.headers })
            .map(response => {
                return this.getResponse(response, collection);
            })
            .catch(this.handleError);
    }

    private post(uri, data, collection = false) {

        // this.headers = this.setAuthorizationHeader();

        return this.http.post(uri, data, { headers: this.headers })
            .map((response) => {
                // return response.json()['data'];
                return this.getResponse(response, collection);
            })
            .catch(this.handleError);
    }

    private getResponse(response, collection) {

        const resp = response.json();

        if (!collection) {
            return resp;
        }

        return resp.map((resp) => resp);
    }

    private handleError(error: Response | any) {
        return Observable.throw(error);
    }

    private getPath(uri) {
        return Constants.API_URL + uri;
    }
}
