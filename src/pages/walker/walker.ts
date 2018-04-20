import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookWalkPage } from '../book-walk/book-walk'
import { LoginPage } from '../login/login'
import { Storage } from '@ionic/storage'
import { WalkFeedPage } from '../walk-feed/walk-feed'
import { SignUpPage } from '../sign-up/sign-up'
import { DomSanitizer } from '@angular/platform-browser'


/**
 * Generated class for the WalkerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-walker',
  templateUrl: 'walker.html',
})
export class WalkerPage {

	walker = {
		name : '',
		about : '',
		video : '',
		trust : '',
	}

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  	private storage : Storage,
  	public sanitizer : DomSanitizer, ) {
  }

  ngOnInit() {
      /*this.storage.get('selectedWalker')
      	.then((val) => {
      		this.walker = val
      	})*/


      this.walker = JSON.parse(localStorage.getItem('selectedWalker'))
   }

   public getSanitizeUrl(url : string) {
     return this.sanitizer.bypassSecurityTrustUrl(url)
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalkerPage');

    //this.requestWalker()

    /*this.storage.get('selectedWalker')
      	.then((val) => {
      		this.walker = val
      	})*/


  }

	requestWalker() {

		//pseudo-logic
		let login = false

		//this.navCtrl.push(BookWalkPage)

		this.storage.get('client')
			.then((client) => {

				if (client) {
					this.navCtrl.push(BookWalkPage)
				}
				else {
					this.navCtrl.push(SignUpPage)
				}
			})
			.catch( (err) => {
				alert('Error')
				console.log(err)
			})
		
		//this.navCtrl.push(LoginPage)
		
	}

	contact() {

		this.navCtrl.push(WalkFeedPage)

	}

}
