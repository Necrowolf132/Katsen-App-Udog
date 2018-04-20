var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as Constants from '../../providers/config';
var API_URL = Constants.API_URL;
var ApiServiceProvider = /** @class */ (function () {
    function ApiServiceProvider(http, plt) {
        this.http = http;
        this.plt = plt;
        this.headers = new Headers();
    }
    ApiServiceProvider.prototype.getWalkers = function () {
        return this.get(this.getPath('active'));
    };
    ApiServiceProvider.prototype.setAuthorizationHeader = function () {
        var token = localStorage.getItem('token');
        if (this.headers.has('Authorization')) {
            this.headers.set('Authorization', 'Bearer ' + token);
        }
        else {
            this.headers.append('Authorization', 'Bearer ' + token);
        }
        return this.headers;
    };
    ApiServiceProvider.prototype.get = function (uri, collection) {
        // this.headers = this.setAuthorizationHeader();
        var _this = this;
        if (collection === void 0) { collection = true; }
        return this.http
            .get(uri, { headers: this.headers })
            .map(function (response) {
            return _this.getResponse(response, collection);
        })
            .catch(this.handleError);
    };
    ApiServiceProvider.prototype.post = function (uri, data, collection) {
        // this.headers = this.setAuthorizationHeader();
        var _this = this;
        if (collection === void 0) { collection = false; }
        return this.http.post(uri, data, { headers: this.headers })
            .map(function (response) {
            // return response.json()['data'];
            return _this.getResponse(response, collection);
        })
            .catch(this.handleError);
    };
    ApiServiceProvider.prototype.getResponse = function (response, collection) {
        var resp = response.json();
        if (!collection) {
            return resp;
        }
        return resp.map(function (resp) { return resp; });
    };
    ApiServiceProvider.prototype.handleError = function (error) {
        return Observable.throw(error);
    };
    ApiServiceProvider.prototype.getPath = function (uri) {
        return Constants.API_URL + uri;
    };
    ApiServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, Platform])
    ], ApiServiceProvider);
    return ApiServiceProvider;
}());
export { ApiServiceProvider };
//# sourceMappingURL=api-service.js.map