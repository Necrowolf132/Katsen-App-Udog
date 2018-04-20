import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import axios from 'axios'
import { BookWalkPage } from '../book-walk/book-walk'
import { FireProvider } from '../../providers/fire/fire'
import { ClientProvider } from '../../providers/client/client'
import * as firebase from 'firebase'

import * as Constants from '../../providers/config'

const API_URL = Constants.API_URL;


/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

	email : string
	password : string

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private storage : Storage,
    private fire : FireProvider,
    public client_provider : ClientProvider,
    public events : Events ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  async emailLogin() {

    /*let response = await axios.post("https://959a101a.ngrok.io/auth", {

        email : this.email,
        password : this.password
    })

    if ( response.status == 200 ) {

      let client = response.data.client 

      this.storage.set('client', client)

      this.navCtrl.push(BookWalkPage)

    }else {
      alert('Wrong email or password')
    }*/

    let email = this.email 
    let password = this.password

    this.fire.signIn(email, password)
      .then((val) => {
        console.log(val)
        /*let client = {
          client_id : firebase.auth().currentUser.uid,
          email : firebase.auth().currentUser.email
        }*/
        axios.post(API_URL+'auth', {
          email : email
        })
        .then((res) => {
           console.log(res.data)
           this.storage.set('client', res.data)
           this.storage.set('phone', res.data.phone)

           this.client_provider.client = res.data

           this.events.publish('client:in')

            this.navCtrl.push(BookWalkPage)  //push(BookWalkPage)
        })
        .catch((err) => {
          console.log(err)
        })

      })
      .catch((err) => {
        alert('Sorry! we could not sign you in')
        console.log(err)
      })
  }

}
