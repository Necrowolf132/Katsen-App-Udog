import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, PopoverController, AlertController , Events, 
ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'
import { TabsPage } from '../tabs/tabs'
import { SettingsPage } from '../settings/settings'
import { Storage } from '@ionic/storage'
import { WalkFeedPage } from '../walk-feed/walk-feed'
import { NotificationsPopOverPage } from '../notifications-pop-over/notifications-pop-over'
import { SocialSharing } from '@ionic-native/social-sharing'
import * as firebase from 'firebase'
import { ReportPage } from '../report/report'


declare var google

@IonicPage()
@Component({
  selector: 'page-track-walk',
  templateUrl: 'track-walk.html',
})
export class TrackWalkPage {

   @ViewChild('map') mapElement : ElementRef
   map : any;
   marker : any
   lat : any 
   lng : any 
   request : any 
   date : any = 0
   path : any = []
   request_id : any 

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation : Geolocation,
    public viewCtrl : ViewController,
    private storage : Storage,
    public popCtrl : PopoverController,
    public alertCtrl : AlertController,
    public events : Events,
    private socialsharing : SocialSharing,
    public modalCtrl : ModalController ) {


    this.events.subscribe('message:received',() => {

      this.popOver()

    })

    //this.walkEnd()




    //this.loadData()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackWalkPage');
    this.loadMap()
    //this.listenForChanges()
    
  }

  ngOnInit() {
    //this.initialMarker()
    /*this.loadData()

    this.storage.get('request._id')
      .then(request_id => {
        this.request_id = request_id
      })
      .catch((err) => console.log(err))*/

    this.request = JSON.parse(localStorage.getItem('request'))

    console.log(this.request)
  }

   loadMap() {

     this.geolocation.getCurrentPosition()
       .then((position) => {

           let mapOptions = {

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
          //this.initialMarker()
          

       })
       .catch((err) => {
         alert('We could not get your current location')
         console.log(err)
       })

  		//this.addMarker()

  	}

    addMarker(lat, lng) {

      this.marker = new google.maps.Marker({
        position : {
          lat : lat, //37.774505,
          lng : lng // -122.420453,
        },
        //icon : walker.pic,
        map : this.map,
      })

      return this.marker
      
    }

    addPolyline() {

      let walkPath = new google.maps.Polyline({
        path : this.path,
        geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
      })

      walkPath.setMap(this.map)
    }

    loadData() {
  
      this.storage.get('request')
        .then((val)=> {
            this.request = val
            console.log(this.request)
            this.initialMarker()
        })
        .catch((err) => console.log(err))
    
    }

    initialMarker() {
      firebase.database().ref(`/requests/${this.request._id}`).once('value')
        .then((snap) => {
          this.lat = snap.val().lat || 0.0
          this.lng = snap.val().lng || 0.0
            //this.marker.setPosition(lat, lng)
            //let latLng = new google.maps.LatLng(lat, lng)
            //this.marker.setPosition(latLng)
            this.addMarker(this.lat, this.lng)
            this.listenForChanges()

        })
        .catch((err) => {
          console.log(err)
        })
    }

    listenForChanges() {

      firebase.database().ref(`/requests/${this.request._id}`).on('value', 
        (snap) => {
            console.log(snap.val())
            let lat = snap.val().lat
            let lng = snap.val().lng
            this.date = snap.val().date
            this.lat = lat 
            this.lng = lng 
            this.path.push({ lat: this.lat, lng : this.lng})
            this.addPolyline()
            //this.marker.setPosition(lat, lng)
            let latLng = new google.maps.LatLng(lat, lng)
            this.marker.setPosition(latLng)
            //this.addMarker(lat, lng)
        })

        
    }

    message() {

      this.navCtrl.push(WalkFeedPage)
    }

    close() {

      this.viewCtrl.dismiss()
      this.navCtrl.setRoot(TabsPage)

    }

    popOver() {

      let alertPopOver = this.popCtrl.create(NotificationsPopOverPage, {cssClass : 'inset-modal'})
      alertPopOver.present()

    }

    cancel() {

      let prompt = this.alertCtrl.create({
      message : `<ion-row style="align-item: center">

        <ion-col col-6 offset-3>
          <img src="assets/imgs/snowball.png" width="90px" class="pet-pic"/>
        </ion-col>


        <ion-col col-3 offset-9>

          <img src="assets/imgs/greencheck.svg"/>

        </ion-col>

      </ion-row>
      Are you sure, you want to cancel the walk`,//'Are you sure, you want to cancel the walk',
      buttons : [
        {
          text : 'NO',
          handler : data => { }
        },
        {
          text : 'YES, cancel',
          handler : data => { }
        }
      ],
      cssClass : 'ion-modal.inset-modal',
    })
    prompt.present()

    }


    share() {

      this.socialsharing.share("Share message", "Share subject", "URL to file or image", "A URL to share").then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });

    }

    settings() {

    let settingsModal = this.modalCtrl.create(SettingsPage)
    settingsModal.present()

  }

  walkEnd() {

    firebase.firestore().collection("walks").where('walkended', '==', true).where('_id', '==', this.request._id)
    .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            this.navCtrl.push(ReportPage)
        });
        
    });

  }

}
