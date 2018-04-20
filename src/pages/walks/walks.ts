import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage'

import axios from 'axios'
import * as Constants from '../../providers/config'
import { TrackWalkPage } from '../track-walk/track-walk'
import { ReportPage } from '../report/report'
import * as firebase from 'firebase'
import '@firebase/firestore'

import { ClientProvider } from '../../providers/client/client'

const API_URL = Constants.API_URL;

/**
 * Generated class for the WalksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-walks',
  templateUrl: 'walks.html',
})
export class WalksPage {

	pendingWalks : any = []
  completedWalks : any = []
	client_id = '8564b56e-fbbc-11e7-b062-dbaa40bb4ff2'
  client : any

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public modalCtrl : ModalController,
  	private storage : Storage,
    public client_provider : ClientProvider,
    public events : Events,
    public platform : Platform ) {

    //console.log(this.client_provider.client.client_id)

    //this.loadData()

    this.events.subscribe('client:in', () => {
      console.log('new_event')
      this.loadData()
      location.reload()
    })

    this.events.subscribe('walk:booking', () => {
      this.navCtrl.setRoot(TrackWalkPage)
      this.loadData()
      location.reload()
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalksPage');
    
  }

  ngOnInit() {

  	//this.fetchActiveWalks()
    this.loadData()
  }

  loadData() {
  
    this.platform.ready()
      .then(() => {
        this.storage.get('client')
        .then((val)=> {
            this.client = val
            console.log(this.client)
            this.client_id = val.client_id
            console.log(this.client_id)
            //this.fetchActiveWalks()
            //this.fetchCompletedWalks()
            this.notificationsFire()
            this.pastWalks()
        })
        .catch((err) => console.log(err)) 
      })
      .catch((err) => console.log(err))
         
    }

  notificationsFire() {

    let firestore = firebase.firestore()

    firestore.collection('walks').where('client_id', '==', `${this.client.client_id}`).where('pending', '==', true)
      .get()
      .then((snapshot) => {

          snapshot.forEach((doc) => {

            console.log(doc.id)
            console.log(doc.data())
            this.pendingWalks.push(doc.data())

          })

      })
      .catch((err) => console.log(err))
  }

  fetchActiveWalks() {
  	axios.get(API_URL+`walks?client_id=${this.client.client_id}`) //walker_id
  			.then((res) => {
  				this.pendingWalks = res.data
  			})
  			.catch((err) => {
  				console.log(err)
  			})
        
  }

  fetchCompletedWalks() {
    axios.get(API_URL+`completed_walks?client_id=${this.client.client_id}`) //walker_id
        .then((res) => {
          this.completedWalks = res.data
        })
        .catch((err) => {
          console.log(err)
        })
        
  }

  pastWalks() {

    let firestore = firebase.firestore()

    firestore.collection('walks').where('client_id', '==', `${this.client.client_id}`).where('pending', '==', false)
      .get()
      .then((snapshot) => {

          snapshot.forEach((doc) => {

            console.log(doc.id)
            console.log(doc.data())
            this.completedWalks.push(doc.data())

          })

      })
      .catch((err) => console.log(err))

  }

  review(walk) {

    this.storage.set('walk', walk)
    console.log(walk)

    let reviewModal = this.navCtrl.push(ReportPage)
    //reviewModal.present()
  }


  track(event, request){

  	event.stopPropagation()

  	this.storage.set('request', request)
  	
  	let trackWalkModal = this.navCtrl.push(TrackWalkPage)
    //trackWalkModal.present()

  }

}
