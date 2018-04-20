var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { SignInPage } from '../sign-in/sign-in';
import { GooglePlus } from '@ionic-native/google-plus';
//import { BookWalkPage } from '../book-walk/book-walk'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    /*private oauth: OauthCordova = new OauthCordova();
    private facebookProvider: Facebook = new Facebook({
      clientId: "548230068871334",
      
    })*/
    function LoginPage(navCtrl, navParams, platform, googlePlus) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.googlePlus = googlePlus;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.googleLogin = function () {
        this.googlePlus.login({})
            .then(function (res) {
            console.log(res);
            //this.navCtrl.push(BookWalkPage)
        })
            .catch(function (err) { return console.log(err); });
    };
    LoginPage.prototype.register = function () {
        this.navCtrl.push(SignUpPage);
    };
    LoginPage.prototype.facebookLogin = function () {
    };
    LoginPage.prototype.login = function () {
        this.navCtrl.push(SignInPage);
    };
    LoginPage.prototype.forgot = function () {
        alert("not implemented");
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Platform, GooglePlus])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map