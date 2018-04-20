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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookWalkPage } from '../book-walk/book-walk';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { WalkFeedPage } from '../walk-feed/walk-feed';
/**
 * Generated class for the WalkerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WalkerPage = /** @class */ (function () {
    function WalkerPage(navCtrl, navParams, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.walker = {
            name: '',
            about: '',
            video: '',
            trust: '',
        };
    }
    WalkerPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('selectedWalker')
            .then(function (val) {
            _this.walker = val;
        });
    };
    WalkerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WalkerPage');
        //this.requestWalker()
        /*this.storage.get('selectedWalker')
            .then((val) => {
                this.walker = val
            })*/
    };
    WalkerPage.prototype.requestWalker = function () {
        var _this = this;
        //pseudo-logic
        var login = false;
        //this.navCtrl.push(BookWalkPage)
        this.storage.get('client')
            .then(function (client) {
            if (client) {
                _this.navCtrl.push(BookWalkPage);
            }
            else {
                _this.navCtrl.push(LoginPage);
            }
        })
            .catch(function (err) {
            alert('Error');
            console.log(err);
        });
        //this.navCtrl.push(LoginPage)
    };
    WalkerPage.prototype.contact = function () {
        this.navCtrl.push(WalkFeedPage);
    };
    WalkerPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-walker',
            templateUrl: 'walker.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage])
    ], WalkerPage);
    return WalkerPage;
}());
export { WalkerPage };
//# sourceMappingURL=walker.js.map