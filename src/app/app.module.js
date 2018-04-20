var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { WalkerPage } from '../pages/walker/walker';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SignInPage } from '../pages/sign-in/sign-in';
import { BookWalkPage } from '../pages/book-walk/book-walk';
import { CardPage } from '../pages/card/card';
import { PetPage } from '../pages/pet/pet';
import { WalkFeedPage } from '../pages/walk-feed/walk-feed';
import { TrackWalkPage } from '../pages/track-walk/track-walk';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from '@ionic-native/google-maps';
import { GooglePlus } from '@ionic-native/google-plus';
import { VideoPlayer } from '@ionic-native/video-player';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Stripe } from '@ionic-native/stripe';
//import { CardIO } from '@ionic-native/card-io'
import { ApiServiceProvider } from '../providers/api-service/api-service';
import * as Constants from '../providers/config';
var API_URL = Constants.API_URL;
//import { SocketIoModule, SocketIoConfig } from 'ng-socket-io'
import { FireProvider } from '../providers/fire/fire';
var socketConfig = { url: API_URL, options: {} };
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                AboutPage,
                ProfilePage,
                HomePage,
                TabsPage,
                WalkerPage,
                LoginPage,
                BookWalkPage,
                SignUpPage,
                SignInPage,
                CardPage,
                PetPage,
                WalkFeedPage,
                TrackWalkPage,
            ],
            imports: [
                BrowserModule,
                HttpModule,
                IonicModule.forRoot(MyApp),
                IonicStorageModule.forRoot(),
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                AboutPage,
                ProfilePage,
                HomePage,
                TabsPage,
                WalkerPage,
                LoginPage,
                BookWalkPage,
                SignUpPage,
                SignInPage,
                CardPage,
                PetPage,
                WalkFeedPage,
                TrackWalkPage,
            ],
            providers: [
                GoogleMaps,
                GooglePlus,
                VideoPlayer,
                StreamingMedia,
                Camera,
                Stripe,
                Geolocation,
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                ApiServiceProvider,
                FireProvider
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map