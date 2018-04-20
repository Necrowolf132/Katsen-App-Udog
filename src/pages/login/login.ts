import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up'
import { SignInPage } from '../sign-in/sign-in'
import { GooglePlus } from '@ionic-native/google-plus'
import { BookWalkPage } from '../book-walk/book-walk'
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook'



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	/*private oauth: OauthCordova = new OauthCordova();
    private facebookProvider: Facebook = new Facebook({
      clientId: "548230068871334",
      
    })*/

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform : Platform, private googlePlus : GooglePlus,
    private fb : Facebook) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  googleLogin() {

    this.googlePlus.login({})
      .then( res => {
        console.log(res)
        this.navCtrl.push(BookWalkPage)
      })
      .catch( err => console.log(err)) 
  }

  register() {
  	this.navCtrl.push(SignUpPage)
  }

  facebookLogin() {

    this.fb.login(['public_profile', 'email'])
      .then((res : FacebookLoginResponse) => {
         console.log(res)
         alert('Logged In')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  login(){

    this.navCtrl.push(SignInPage)

  }

  forgot() {
    alert("not implemented")
  }

}
