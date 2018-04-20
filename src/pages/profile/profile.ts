import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { PetPage } from '../pet/pet'
import { SettingsPage } from '../settings/settings'

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public navCtrl: NavController,
  	public modalCtrl : ModalController) {

  }

  addPet(){
    let petModal = this.modalCtrl.create(PetPage)
    petModal.present()
  }

  settings() {

  	let settingsModal = this.modalCtrl.create(SettingsPage)
  	settingsModal.present()

  }
}
