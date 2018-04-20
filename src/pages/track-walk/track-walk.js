var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as firebase from 'firebase';
var TrackWalkPage = /** @class */ (function () {
    function TrackWalkPage(navCtrl, navParams, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
    }
    TrackWalkPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TrackWalkPage');
        this.loadMap();
    };
    TrackWalkPage.prototype.loadMap = function () {
        var _this = this;
        this.geolocation.getCurrentPosition()
            .then(function (position) {
            var mapOptions = {
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                },
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            };
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
            //this.addMarker()
            //this.listenForChanges()
            _this.initialMarker();
        })
            .catch(function (err) {
            alert('We could not get your current location');
            console.log(err);
        });
        //this.addMarker()
    };
    TrackWalkPage.prototype.addMarker = function (lat, lng) {
        this.marker = new google.maps.Marker({
            position: {
                lat: lat,
                lng: lng // -122.420453,
            },
            //icon : walker.pic,
            map: this.map,
        });
        return this.marker;
    };
    TrackWalkPage.prototype.initialMarker = function () {
        var _this = this;
        firebase.database().ref('/walks/' + '101010').once('value')
            .then(function (snap) {
            var lat = snap.val().lat;
            var lng = snap.val().lng;
            //this.marker.setPosition(lat, lng)
            var latLng = new google.maps.LatLng(lat, lng);
            //this.marker.setPosition(latLng)
            _this.addMarker(lat, lng);
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    TrackWalkPage.prototype.listenForChanges = function () {
        /*firebase.database().ref('/walks/'+'101010').on('value',
          (snap) => {
              console.log(snap.val())
              let lat = snap.val().lat
              let lng = snap.val().lng
              //this.marker.setPosition(lat, lng)
              let latLng = new google.maps.LatLng(lat, lng)
              //this.marker.setPosition(latLng)
              this.addMarker(lat, lng)
          })*/
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], TrackWalkPage.prototype, "mapElement", void 0);
    TrackWalkPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-track-walk',
            templateUrl: 'track-walk.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Geolocation])
    ], TrackWalkPage);
    return TrackWalkPage;
}());
export { TrackWalkPage };
//# sourceMappingURL=track-walk.js.map