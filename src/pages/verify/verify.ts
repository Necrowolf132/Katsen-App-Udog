import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import axios from 'axios'
import { SignInPage } from '../sign-in/sign-in'
import { RegisterPage } from '../register/register'
import { PetPage } from '../pet/pet'
import { Storage } from '@ionic/storage'
import { CardPage } from '../card/card'

import * as Constants from '../../providers/config'

const API_URL = Constants.API_URL;

/**
 * Generated class for the VerifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-verify',
 	templateUrl: 'verify.html',
 })
 export class VerifyPage {

 	code : any

 	constructor(public navCtrl: NavController, 
 		public navParams: NavParams,
 		public modalCtrl : ModalController,
 		public storage : Storage ) {
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad VerifyPage');
 	}

 	verify() {

 		axios.post(API_URL + 'client_verify', {
 			token : this.code 
 		})
 		.then((res) => {

 			//this.walker.walker = res.data
 			if (res.data.message) {
 				let registerModal = this.modalCtrl.create(RegisterPage)
 				registerModal.present()
 			}
 			else {
 				this.storage.set('client', res.data)
 				this.storage.get('pet').then((pet) => {
 					if (pet) {
 						this.navCtrl.push(CardPage)
 					}
 					else {
 						this.navCtrl.push(PetPage)
 					}
 				})

 				this.navCtrl.push(PetPage)
 			}
 			console.log(res.data)
 			//this.storage.set('walker', res.data)
 			//this.navCtrl.setRoot(TabsPage)
 		})
 		.catch((err) => {
 			console.log(err)
 		})
 		
 	}

 }
