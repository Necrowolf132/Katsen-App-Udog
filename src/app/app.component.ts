import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase'
import { firebaseConfig } from '../providers/config'

import { TabsPage } from '../pages/tabs/tabs';
import { Geolocation } from '@ionic-native/geolocation'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private geolocation : Geolocation ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.rootPage = TabsPage
      statusBar.styleDefault();
      splashScreen.hide();
      let geoOptions = {
        timeout : 10000,
      }
      /*this.geolocation.getCurrentPosition(geoOptions)
        .then((pos) => {
          console.log(pos.coords)
        })
        .catch((err) => {
          console.log(err)
          alert('we could not get your current location')
        })*/
    });


    firebase.initializeApp(firebaseConfig)
  }


  getLocation() {

      this.geolocation.getCurrentPosition()
       .then((position) => {

         
            console.log(position)
           /*let mapOptions = {

              center : {
                lat : position.coords.latitude,
                lng : position.coords.longitude,
            },
            zoom : 17,
            mapTypeId : google.maps.MapTypeId.ROADMAP,
          }

          this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)
          //this.addMarker()
          //
          //this.initialMarker()*/
          

       })
       .catch((err) => {
         alert('We could not get your current location')
         console.log(err)
       })

    }
}

