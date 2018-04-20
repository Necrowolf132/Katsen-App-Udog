import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, ModalController, Platform, Events } from 'ionic-angular';
import { WalkerPage } from '../walker/walker'
//import { Socket } from 'ng-socket-io'
import { Observable } from 'rxjs/Observable'
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Storage } from '@ionic/storage'
import { TrackWalkPage } from '../track-walk/track-walk'
import { Geolocation } from '@ionic-native/geolocation'

import * as firebase from 'firebase'
import firestore from 'firebase/firestore'

import axios from 'axios'
import * as Constants from '../../providers/config'

const API_URL = Constants.API_URL;

declare var google

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

	@ViewChild('map') mapElement : ElementRef
	map : any;
  lat : any 
  lng : any 
  address : string 

  walkers = []

  constructor(
    public navCtrl: NavController, 
    //private socket: Socket, 
    public apiService: ApiServiceProvider,
    private storage : Storage,
    private modalCtrl : ModalController,
    private geolocation : Geolocation,
    private platform : Platform,
    public events : Events ) { 

      // this.loadWalkers().subscribe(walker => {
      //   this.walkers.push(walker)
      //   //console.log(this.walkers)
      //   this.addMarker(walker)
      // })

       this.platform.ready()
         .then(() => {

             //this.getLocation()
             this.loadMap()
         })
         .catch((err) => console.log(err))
    }

    ngOnInit() {
      //this.loadWalkers();
      //this.loadMap()
      
    }

  	ionViewDidLoad() {
  		//this.loadMap()
      //this.listenForActiveWalks()
  	}

  	loadMap() {

  		/*let mapOptions = {

  			center : {
  					lat : 37.7885,
  					lng : -122.4324,
  				},
  				zoom : 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
  		}
  		

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)*/
      
      console.log('test');

       let geoOptions = {
        timeout : 10000,
      }

  		//this.addMarker()

      this.geolocation.getCurrentPosition()
       .then((position) => {

            this.lat = position.coords.latitude
            this.lng = position.coords.longitude

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
          this.initialMarker(this.lat, this.lng)



          this.nearbyWalkers(this.lat, this.lng)
          this.geocodeLocation(this.lat, this.lng)
          

       })
       .catch((err) => {
         alert('We could not get your current location')
         console.log(err)
       })

  	}

  	addMarker(walker) {

      // this.socket.connect()

      console.log(walker.pic)

      let pic = {
        url : walker.pic,
        size : new google.maps.Size(60,60),
        scaledSize :  new google.maps.Size(25, 25),
        //shape : {coords:[17,17,18],type:'circle'},
        //path : google.maps.SymbolPath.CIRCLE,
      }

  		let marker = new google.maps.Marker({
  			position : {
  				lat : walker.lat, //37.774505,
  				lng : walker.lng// -122.420453,
  			},
        info : walker,
        icon : pic,
  			map : this.map,
  		})

      this.markerClick(marker)

      return marker
  		
    }


    initialMarker(lat, lng) {

      let pic = {
        url : "assets/imgs/here.svg",
        size : new google.maps.Size(60,60),
        scaledSize :  new google.maps.Size(40, 40),
        //path : google.maps.SymbolPath.CIRCLE,
      }

      let marker = new google.maps.Marker({
        position : {
          lat :lat, //37.774505,
          lng : lng// -122.420453,
        },
        icon : pic,
        map : this.map,
      })

      return marker
      
    }

    getLocation() {

      this.geolocation.getCurrentPosition()
       .then((position) => {

         //this.ionViewDidLoad()

           this.lat = position.coords.latitude
           this.lng = position.coords.longitude

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

    }

    geocodeLocation(lat, lng) {

       console.log('called')

       let geocoder = new google.maps.Geocoder()
       let latLng = { lat : lat, lng : lng}

       geocoder.geocode({'location' : latLng}, (results, status) => {
         if (status === 'OK') {
           if (results[0]) {
             this.address = results[0].formatted_address
             this.storage.set('address', this.address)
             console.log(this.address)
           }else {
             console.log('no results found')
           }
         }else {
           console.log('geocoder failed due to' + status)
         }
       })
     
     }

    nearbyWalkers(lat, lng) {

      console.log(lat)
      console.log(lng)

        axios.get(API_URL+`active?lng=${lng}&lat=${lat}`)
          .then((response) => {
            //console.log(response.data)
            response.data.map( walker => this.addMarker(walker))
          })
          .catch((err) => {
            console.log(err)
            alert('we could not get walkers near you')
          })

    }
    
    loadWalkers() {

      // let observable = new Observable(observer => {
      //    this.socket.on('active_walkers', (walker) => {
      //      observer.next(walker)
      //      //console.log(walker.latitude)
      //      alert('new walker')
      //    })
      // })
      // return observable

      this.apiService.getWalkers()
        .subscribe(
        (walker) => {
          this.walkers = walker;

          console.log(walker);

          this.walkers.map( walker => {

            console.log(walker.pic)
            //let image = walker.pic 
            let image = {
              url : walker.pic,
              scaledSize : new google.maps.Size(64,64),
              //path : new google.maps.SymbolPath.CIRCLE,
              //origin : new google.maps.Point(0,0),
              //anchor : new google.maps.Point(0,0)
            } 

            let marker = new google.maps.Marker({
              position : {
                lat : walker.latitude,
                lng : walker.longitude,
              },
              icon : image,
              walkerInfo : walker,

              map : this.map,
            })

            /*marker.addListener('click',
                (mark) => {
                  this.storage.set('selectedWalker', mark.walkerInfo)
              this.navCtrl.push(WalkerPage)
            })*/

            this.markerClick(marker)

            return marker

          });
        },
        error => {

        },
        () => {
          // 'onCompleted' callback.
        }
        );

    }

    markerClick(marker) {

      console.log(marker.info)
      
      marker.addListener('click',
                () => {
                  //this.storage.set('selectedWalker', marker.info)
                  localStorage.setItem('selectedWalker', JSON.stringify(marker.info))
                  this.events.publish('walker:selected', marker.info)
                  this.navCtrl.push(WalkerPage)
      })

    } 

    listenForActiveWalks() {

      if (firebase.database().ref('/walks/'+'101010').once('child_added')) {

        let trackModal = this.modalCtrl.create(TrackWalkPage)
        trackModal.present()


      }
    }

}
