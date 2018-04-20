import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import axios from 'axios'
import { BookWalkPage } from '../book-walk/book-walk'
import { Storage } from '@ionic/storage'
import { FireProvider } from '../../providers/fire/fire'
import * as firebase from 'firebase'
import '@firebase/firestore'
import { VerifyPage } from '../verify/verify'

import * as Constants from '../../providers/config'

const API_URL = Constants.API_URL;

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  email : string
  password : string
  name : string
  phone : string 

  //const url : "https://6ac3f451.ngrok.io"

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private storage : Storage,
    private fire : FireProvider ) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  
  /*async create(){

    let _id = (Date.now()).toString()

    this.fire.createUser(email,password)
      .then(() => {

        let client = {
          name : this.name,
          phone : this.phone,
          email : this.email,
          client_id : _id
        }

         

         

        /*axios.post(API_URL+'clients', {
            email : this.email,
            name : this.name,
            phone : this.phone,
        })
        .then((res) => {
            let client_id = res.data.client_id
            console.log(client_id)
            let client = {
                name : this.name,
                email : this.email,
                phone : this.phone,
                client_id : client_id,
            }
          this.storage.set('client', client)
          this.storage.set('phone', this.phone)
          this.navCtrl.popTo(BookWalkPage)
        })
      })
      .catch((err) => {
        alert('We could not sign you up')
        console.log(err)
      })
    
  }*/


  login() {
    axios.post(API_URL + 'login', {
      phone : this.phone 
    })
    .then((res) => {
      this.storage.set('phone', this.phone)
      this.navCtrl.push(VerifyPage)
    })
    .catch((err) => {
      console.log(err)
    })
  }
}
