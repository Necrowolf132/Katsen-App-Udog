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
import { NavController, ModalController } from 'ionic-angular';
import { WalkerPage } from '../walker/walker';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Storage } from '@ionic/storage';
import { TrackWalkPage } from '../track-walk/track-walk';
import * as firebase from 'firebase';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, 
        //private socket: Socket, 
        apiService, storage, modalCtrl) {
        this.navCtrl = navCtrl;
        this.apiService = apiService;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.walkers = [];
        // this.loadWalkers().subscribe(walker => {
        //   this.walkers.push(walker)
        //   //console.log(this.walkers)
        //   this.addMarker(walker)
        // })
    }
    HomePage.prototype.ngOnInit = function () {
        this.loadWalkers();
    };
    HomePage.prototype.ionViewDidLoad = function () {
        this.loadMap();
        this.listenForActiveWalks();
    };
    HomePage.prototype.loadMap = function () {
        var mapOptions = {
            center: {
                lat: 37.7885,
                lng: -122.4324,
            },
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        console.log('test');
        //this.addMarker()
    };
    HomePage.prototype.addMarker = function (walker) {
        // this.socket.connect()
        var marker = new google.maps.Marker({
            position: {
                lat: walker.latitude,
                lng: walker.longitude // -122.420453,
            },
            //icon : walker.pic,
            map: this.map,
        });
    };
    HomePage.prototype.loadWalkers = function () {
        // let observable = new Observable(observer => {
        //    this.socket.on('active_walkers', (walker) => {
        //      observer.next(walker)
        //      //console.log(walker.latitude)
        //      alert('new walker')
        //    })
        // })
        // return observable
        var _this = this;
        this.apiService.getWalkers()
            .subscribe(function (walker) {
            _this.walkers = walker;
            console.log(walker);
            _this.walkers.map(function (walker) {
                console.log(walker.pic);
                //let image = walker.pic 
                var image = {
                    url: walker.pic,
                    scaledSize: new google.maps.Size(64, 64),
                };
                var marker = new google.maps.Marker({
                    position: {
                        lat: walker.latitude,
                        lng: walker.longitude,
                    },
                    icon: image,
                    walkerInfo: walker,
                    map: _this.map,
                });
                /*marker.addListener('click',
                    (mark) => {
                      this.storage.set('selectedWalker', mark.walkerInfo)
                  this.navCtrl.push(WalkerPage)
                })*/
                _this.markerClick(marker);
                return marker;
            });
        }, function (error) {
        }, function () {
            // 'onCompleted' callback.
        });
    };
    HomePage.prototype.markerClick = function (marker) {
        var _this = this;
        console.log(marker.walkerInfo);
        marker.addListener('click', function () {
            _this.storage.set('selectedWalker', marker.walkerInfo);
            _this.navCtrl.push(WalkerPage);
        });
    };
    HomePage.prototype.listenForActiveWalks = function () {
        if (firebase.database().ref('/walks/' + '101010').once('child_added')) {
            var trackModal = this.modalCtrl.create(TrackWalkPage);
            trackModal.present();
        }
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], HomePage.prototype, "mapElement", void 0);
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController,
            ApiServiceProvider,
            Storage,
            ModalController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map