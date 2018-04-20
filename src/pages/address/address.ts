import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage'

/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {

	address = ''
  unit = ''

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private storage : Storage,
    public events : Events,
    public viewCtrl : ViewController ) {

  	this.storage.get('address')
     .then(address => {
       this.address = address
     })
     .catch((err) => console.log(err))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');


  }

  continue() {

    this.address = this.unit + ' ' + this.address 
    this.events.publish('address:current', this.address)
    this.viewCtrl.dismiss()

  }

}
