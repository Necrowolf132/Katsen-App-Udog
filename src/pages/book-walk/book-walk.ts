import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, SegmentButton, ModalController, Events } from 'ionic-angular';
//import { Socket } from 'ng-socket-io'
import { Observable } from 'rxjs/Observable'
import { FireProvider } from '../../providers/fire/fire';
import { Storage } from '@ionic/storage'
import { CardPage } from '../card/card'
import { TrackWalkPage } from '../track-walk/track-walk'
import { AddressPage } from '../address/address'
import { WalksPage } from '../walks/walks'
import { TabsPage } from '../tabs/tabs'
import axios from 'axios'
import * as firebase from 'firebase'
import '@firebase/firestore'


import * as Constants from '../../providers/config'

const API_URL = Constants.API_URL;
/**
 * Generated class for the BookWalkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-book-walk',
   templateUrl: 'book-walk.html',
 })
 export class BookWalkPage {

   time = 'thirty';

   walker : any
   client : any = {}
   pet = {
     name : 'Rex',
     pic : 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=633&q=80',
     weight : 10,
     social : 'social',
     breed : 'bulldog',
   }
   duration = {
     time : 30,
     cost : 15
   }
   info = ''
   pickUp = ''
   dropOff = ''
   receiverName = ''
   receiverPhone = ''
   pickUpTime = ''
   token : any
   phone : any 


   card = {}

   constructor(public navCtrl: NavController, public navParams: NavParams, 
     private fire : FireProvider,
     private storage : Storage,
     public modalCtrl : ModalController,
     public events : Events ) {

     this.events.subscribe('address:current', (address) => {
       console.log(address)
       this.pickUp = address

     })


   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad BookWalkPage');
     console.log(this.client)

     this.events.subscribe('walker:selected', (walker) => {

       this.walker = walker
       console.log(walker)

     })

   }

   ngOnInit() {
     this.storage.get('card')
     .then((val) => {
       this.card = val
     })

     this.storage.get('client')
     .then((val) => {
       this.client = val
     })

     this.storage.get('selectedWalker')
     .then(walker => {
       this.walker = walker
     })
     .catch((err) => console.log(err))

     this.storage.get('address')
     .then(address => {
       this.pickUp = address
     })
     .catch((err) => console.log(err))


     this.storage.get('token')
     .then(token => {
       this.token = token 
       console.log(this.token)
     })
   }

   async book() {

     let requestData = {
       pet : this.pet,
       duraton : this.duration,
       info : this.info,
       dropOff : this.dropOff,
       pickUp : this.pickUp, 
       accepted : false,
     }

     let uid = this.client.client_id
     let walker_id = this.walker.id
     /*
    this.fire.request(requestData, walker_id, uid )
      .then((val) =>{
        console.log(val)
      })
      .catch((error : any) => {
        alert(error.message)   
      })*/


      this.storage.get('client')
      .then((client) => {

        this.storage.get('phone')
        .then((phone) => {

          this.phone = phone 
          console.log(this.phone)

          if (phone) {
            if (client) {
              console.log(client.client_id)
              /*axios.post(API_URL+'requests', {
                client_id : client.client_id,
                walker_id : '101010',
                phone : this.phone,
                pet : this.pet,
                info : this.info,
                dropOff : this.dropOff,
                pickUp : this.pickUp, 
                duration : this.duration,
                accepted : false,
                pending : true,
                time : this.pickUpTime,
                receiver : {
                  name : this.receiverName,
                  phone : this.receiverPhone,
                }

              })  
              .then((res) => {
                console.log(res.data)
                this.navCtrl.setRoot(WalksPage)
                
              })
              .catch((err) => {
                console.log(err)
              })*/

              this.saveToFirestore()

            }
          }

        })


      })
      .catch( (err) => {
        alert('Error')
        console.log(err)
      })   


      

    }

    saveToFirestore() {

      let _id = Date.now()

      let firestore = firebase.firestore()

      let walk = {
          _id : `${_id}`,
        client_id : this.client.client_id,
        walker_id : this.walker.walker_id,
        phone : this.phone,
        pet : this.pet,
        info : this.info,
        dropOff : this.dropOff,
        pickUp : this.pickUp, 
        duration : this.duration,
        accepted : false,
        pending : true,
        time : this.pickUpTime,
        walker : this.walker,
        token : this.token
      }

      firestore.collection('walks').doc(`${_id}`).set({
        id : `${_id}`,
        client_id : this.client.client_id,
        walker_id : this.walker.walker_id,
        phone : this.phone,
        pet : this.pet,
        info : this.info,
        dropOff : this.dropOff,
        pickUp : this.pickUp, 
        duration : this.duration,
        accepted : false,
        pending : true,
        time : this.pickUpTime,
        walker : this.walker,
        token : this.token
      })
      .then((docRef) => {
        console.log(`doc written with`)
        firebase.firestore().collection('walks').doc(`${_id}`)
        .get()
        .then((doc) => {
          if (doc.exists) {
            //this.storage.set('request', doc.data())
            localStorage.setItem('request', JSON.stringify(walk))
            this.navCtrl.setRoot(TrackWalkPage)
          } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

    })
      .catch((err) => console.log(err))
        this.storage.set('request._id', _id)
        //
        //location.reload()

        this.events.publish('walk:booking')
      })
      .catch((err) => console.log(err))
    }

    payment() {
    //if (this.card === null) {
      let cardModal = this.modalCtrl.create(CardPage)
      cardModal.present()
    //}
  }

  durationSelect(val) {
    if (val === 'sixty') {
      this.duration = {
        time : 60,
        cost : 25,
      }
    } else {
      this.duration = {
        time: 30,
        cost: 15,
      }
    }
  }

  changeAddress() {
    let addressModal = this.modalCtrl.create(AddressPage)
    addressModal.present()
  }

  // segmentChanged(segmentButton : SegmentButton) {

  //   if ( this.time == 'sixty') {
  //     this.duration = {
  //       time : 60,
  //       cost : 25,
  //     }
  //   }else {
  //     this.duration = {
  //       time : 30,
  //       cost : 15,
  //     }
  //   }
  // }

}
