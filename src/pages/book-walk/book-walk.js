var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FireProvider } from '../../providers/fire/fire';
import { Storage } from '@ionic/storage';
import { CardPage } from '../card/card';
import { TrackWalkPage } from '../track-walk/track-walk';
import axios from 'axios';
import * as Constants from '../../providers/config';
var API_URL = Constants.API_URL;
/**
 * Generated class for the BookWalkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BookWalkPage = /** @class */ (function () {
    function BookWalkPage(navCtrl, navParams, fire, storage, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fire = fire;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.time = 'thirty';
        this.walker = {
            name: 'Jane Doe',
            about: '',
            video: '',
            trust: '',
            pic: '',
            id: '1301240e-d555-11e7-92a9-97f054d497a7',
        };
        this.client = {};
        this.pet = {
            name: 'Rex',
            pic: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=633&q=80',
            weight: 10,
            social: 'social',
            breed: 'bulldog',
        };
        this.duration = {
            time: 30,
            cost: 15
        };
        this.info = '';
        this.pickUp = '';
        this.dropOff = '';
        this.receiverName = '';
        this.receiverPhone = '';
        this.pickUpTime = '';
        this.card = {};
    }
    BookWalkPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BookWalkPage');
        this.payment();
        console.log(this.client);
    };
    BookWalkPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('card')
            .then(function (val) {
            _this.card = val;
        });
        this.storage.get('client')
            .then(function (val) {
            _this.client = val;
        });
    };
    BookWalkPage.prototype.book = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var requestData, uid, walker_id;
            return __generator(this, function (_a) {
                requestData = {
                    pet: this.pet,
                    duraton: this.duration,
                    info: this.info,
                    dropOff: this.dropOff,
                    pickUp: this.pickUp,
                    accepted: false,
                };
                this.storage.get('selectedWalker')
                    .then(function (walker) {
                    _this.walker = walker;
                });
                uid = this.client.client_id;
                walker_id = this.walker.id;
                /*
               this.fire.request(requestData, walker_id, uid )
                 .then((val) =>{
                   console.log(val)
                 })
                 .catch((error : any) => {
                   alert(error.message)
                 })*/
                this.storage.get('client')
                    .then(function (client) {
                    if (client) {
                        console.log(client.client_id);
                        var response = axios.post(API_URL + 'requests', {
                            client_id: client.client_id,
                            walker_id: walker_id,
                            phone: client.phone,
                            pet: _this.pet,
                            duraton: _this.duration,
                            info: _this.info,
                            dropOff: _this.dropOff,
                            pickUp: _this.pickUp,
                            duration: _this.duration,
                            accepted: false,
                            pending: true,
                            time: _this.pickUpTime,
                            receiver: {
                                name: _this.receiverName,
                                phone: _this.receiverPhone,
                            }
                        })
                            .then(function (res) {
                            console.log(res.data);
                            var trackWalkModal = _this.modalCtrl.create(TrackWalkPage);
                            trackWalkModal.present();
                        })
                            .catch(function (err) {
                            console.log(err);
                        });
                    }
                })
                    .catch(function (err) {
                    alert('Error');
                    console.log(err);
                });
                return [2 /*return*/];
            });
        });
    };
    BookWalkPage.prototype.payment = function () {
        //if (this.card === null) {
        var cardModal = this.modalCtrl.create(CardPage);
        cardModal.present();
        //}
    };
    BookWalkPage.prototype.durationSelect = function (val) {
        if (val === 'sixty') {
            this.duration = {
                time: 60,
                cost: 25,
            };
        }
        else {
            this.duration = {
                time: 30,
                cost: 15,
            };
        }
    };
    BookWalkPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-book-walk',
            templateUrl: 'book-walk.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            FireProvider,
            Storage,
            ModalController])
    ], BookWalkPage);
    return BookWalkPage;
}());
export { BookWalkPage };
//# sourceMappingURL=book-walk.js.map