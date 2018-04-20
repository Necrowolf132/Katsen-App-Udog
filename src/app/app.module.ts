import {NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { WalkerPageModule } from '../pages/walker/walker.module';
import { LoginPageModule } from '../pages/login/login.module';
import { SignUpPageModule } from '../pages/sign-up/sign-up.module';
import { SignInPageModule } from '../pages/sign-in/sign-in.module'
import { BookWalkPageModule } from '../pages/book-walk/book-walk.module';
import { CardPageModule } from '../pages/card/card.module'
import { PetPageModule } from '../pages/pet/pet.module'
import { WalkFeedPageModule } from '../pages/walk-feed/walk-feed.module'
import { TrackWalkPageModule } from '../pages/track-walk/track-walk.module'
import { WalksPageModule } from '../pages/walks/walks.module'
import { ReportPageModule } from '../pages/report/report.module'
import { SettingsPageModule } from '../pages/settings/settings.module'
import { AddressPageModule } from '../pages/address/address.module'
import { NotificationsPopOverPageModule } from '../pages/notifications-pop-over/notifications-pop-over.module'
import { VerifyPageModule } from '../pages/verify/verify.module'
import { RegisterPageModule} from '../pages/register/register.module'
import { RateWalkPageModule } from '../pages/rate-walk/rate-walk.module'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing'
import { GoogleMaps } from '@ionic-native/google-maps'
import { GooglePlus } from '@ionic-native/google-plus'
import { VideoPlayer } from '@ionic-native/video-player'
import { StreamingMedia } from '@ionic-native/streaming-media'
import { Camera, CameraOptions } from '@ionic-native/camera'
import { Geolocation } from '@ionic-native/geolocation'
import { Facebook } from '@ionic-native/facebook'

import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage'

import { Ionic2RatingModule } from 'ionic2-rating'

import { Stripe } from '@ionic-native/stripe'
//import { CardIO } from '@ionic-native/card-io'

import { ApiServiceProvider } from '../providers/api-service/api-service'

import * as Constants from '../providers/config'


const API_URL = Constants.API_URL;

//import { SocketIoModule, SocketIoConfig } from 'ng-socket-io'
import { FireProvider } from '../providers/fire/fire';
import { ClientProvider } from '../providers/client/client';
const socketConfig = { url : API_URL , options : {}}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ProfilePage,
    HomePage,
    TabsPage

  ],
  imports: [
    BookWalkPageModule,
    AddressPageModule,
    CardPageModule,
    LoginPageModule,
    RateWalkPageModule,
    RegisterPageModule,
    PetPageModule,
    NotificationsPopOverPageModule,
    BrowserModule,
    SignInPageModule,
    SettingsPageModule,
    ReportPageModule,
    SignUpPageModule,
    TrackWalkPageModule,
    VerifyPageModule,
    WalksPageModule,
    WalkerPageModule,
    WalkFeedPageModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
        mode : 'md'

    }),
    IonicStorageModule.forRoot(),
    Ionic2RatingModule,
    //SocketIoModule.forRoot(socketConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ProfilePage,
    HomePage,
    TabsPage
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiServiceProvider,
    FireProvider,
    Facebook,
    ClientProvider,
    SocialSharing
  ],
})
export class AppModule {}
