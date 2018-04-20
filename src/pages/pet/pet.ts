import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera'
import * as firebase from 'firebase'
import '@firebase/firestore'
import { Storage } from '@ionic/storage'
import { BookWalkPage } from '../book-walk/book-walk'
import { CardPage } from '../card/card'



/**
 * Generated class for the PetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pet',
  templateUrl: 'pet.html',
})
export class PetPage {

  breeds = ['BULLDOG','BEAGLE','POODLE','LABRADOR RETRIEVER','GERMAN SHEPHERD','ENGLISH MASTIFF','SIBERIAN HUSKY',
'GOLDEN RETRIEVER','BOXER','BULLDOG','BEAGLE','POODLE',
'LABRADOR RETRIEVER', 'GERMAN SHEPHERD', 'ENGLISH MASTIFF','SIBERIAN HUSKY','GOLDEN RETRIEVER','BOXER', 'AUSTRALIAN SHEPHERD','YORKSHIRE TERRIER',
'OLD ENGLISH SHEEPDOG', 'BULL TERRIER', 'ROTTWEILER','GREAT DANE', 'POINTER', 'CHIHUAHUA', 'DACHSHUND', 
'GREYHOUND', 'AUSTRALIAN CATTLE DOG', 'SHIH TZU', 'PUG', 'CAVALIER KING', 'AKITA', 'BOSTON TERRIER',
'BICHON FRISE', 'ALASKAN MALAMUTE', 'BASSET HOUND', 'DEBERMAN', 'FRENCH BULLDOG', 'POMERANIAN',
'BODER COLLIE', 'MALTESE','JACK RUSSELL','BASENJI','SHETLAND','SCHNAUZER','HAVANESE', 'BULL TERRIER','CHOW CHOW',
'ST. BERNARD','AFGHAN HOUND','LHASA APSO','ENGLISH SPRINGER SPANIEL','PAPILLON' ,'WEST WHITE TERRIER','AIRDALE TERRIER',
'GERMAN SHORTHAIRED','PEMBROKE WELSH','A MIX OF TWO BREEDSYORKSHIRE TERRIER']

  breed : any
  pic : string = 'https://images.unsplash.com/photo-1421098518790-5a14be02b243?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ff70edd02988d22f0e70a4683bd4f133&auto=format&fit=crop&w=1778&q=80'
  name : string = ''
  age : string = ''
  color : string = ''
  vaccination : string = ''
  size : string = ''
  aggressive : string = ''
  social : string = ''
  petInfo : string = ''

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private camera : Camera,
    private platform : Platform,
    private storage : Storage,
    public alertCtrl : AlertController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PetPage');
  }

  save() {

    let pet = {
      name : this.name, 
      pic : this.pic, 
      age : this.age,
      breed : this.breed,
      color : this.color,
      vaccination : this.vaccination,
      size : this.size,
      aggressive : this.aggressive,
      social : this.social,
      petInfo : this.petInfo
    }

  	//this.navCtrl.pop()
    this.storage.get('client')
      .then((client) => {
        let client_id = client.client_id
        firebase.firestore().collection('users').doc(`${client_id}`).collection('pets').add(pet)
          .then(() => {
            this.storage.set('pet', pet)
            console.log('pet written')
            this.additionalPetPrompt()
            
          })
          .catch((err) => console.log(err))
      })
    //console.log(pet)
  }

  picChosen(event) {
    let _id = (Date.now()).toString()
    let imageRef = firebase.storage().ref().child(_id)
    let file = event.target.files[0]
    let reader = new FileReader()
    reader.onload = (event : Event) => {
      let pic = reader.result
      imageRef.putString(pic, 'data_url')
        .then((snap) => {
           this.pic = snap.downloadURL
        })
        .catch((err) => console.log(err))
     
    }

    reader.readAsDataURL(file)

  }

  additionalPetPrompt() {
    let prompt = this.alertCtrl.create({
      message : 'Do you have an additional pet that needs to be walked',
      buttons : [
        {
          text : 'NO',
          handler : data => {
            this.navCtrl.push(CardPage)
          }
        },
        {
          text : 'YES',
          handler : data => { }
        }
      ]
    })
    prompt.present()
  }

  choosePic() {

    const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,

   }
   

   this.platform.ready().then(() => {

   this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
   // If it's base64:
   let base64Image = 'data:image/jpeg;base64,' + imageData;
   }, (err) => {
   // Handle error
     console.log(err)
     alert(err)
    })

   })
   .catch((err) => alert(err))
    

    /*
     this.camera.getPicture({
    correctOrientation: true,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,

  }).then((imageData) => {
    let base64Image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
    console.error(err);
  });

  */

  }

}
