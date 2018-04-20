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
import { Camera } from '@ionic-native/camera';
/**
 * Generated class for the PetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PetPage = /** @class */ (function () {
    function PetPage(navCtrl, navParams, camera, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.platform = platform;
    }
    PetPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PetPage');
    };
    PetPage.prototype.save = function () {
        this.navCtrl.pop();
    };
    PetPage.prototype.choosePic = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        };
        this.platform.ready().then(function () {
            _this.camera.getPicture(options).then(function (imageData) {
                // imageData is either a base64 encoded string or a file URI
                // If it's base64:
                var base64Image = 'data:image/jpeg;base64,' + imageData;
            }, function (err) {
                // Handle error
                console.log(err);
                alert(err);
            });
        })
            .catch(function (err) { return alert(err); });
        /*
         this.camera.getPicture({
        correctOrientation: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    
      }).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        console.error(err);
      });
    
      */
    };
    PetPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-pet',
            templateUrl: 'pet.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Camera,
            Platform])
    ], PetPage);
    return PetPage;
}());
export { PetPage };
//# sourceMappingURL=pet.js.map