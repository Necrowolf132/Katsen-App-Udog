import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { DomSanitizer } from '@angular/platform-browser'
import * as firebase from 'firebase'
import '@firebase/firestore'
import { Storage } from '@ionic/storage'


/**
 * Generated class for the WalkFeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-walk-feed',
   templateUrl: 'walk-feed.html',
 })
 export class WalkFeedPage {

   messages = []
   newMessage : any 
   request : any
   request_id : any 

   constructor(public navCtrl: NavController, public navParams: NavParams,
     private camera : Camera,
     public sanitizer : DomSanitizer,
     private storage : Storage,
     public events : Events ) {
   }

   public getSanitizeUrl(url : string) {
     return this.sanitizer.bypassSecurityTrustUrl(url)
   }

   ngOnInit() {
     this.loadData()

     this.storage.get('request._id')
      .then(request_id => {
        this.request_id = request_id
      })
      .catch((err) => console.log(err))
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad WalkFeedPage');

    //this.newMessages()
  }

  chooseImage() {

  	let message = { type: 'image', img : null }

  	const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,

    }





    this.camera.getPicture(options).then((imageData) => {
	 // imageData is either a base64 encoded string or a file URI
	 // If it's base64:

	 let base64Image = 'data:image/jpeg;base64,' + imageData;
	 message.img = base64Image
	 this.messages.push(message)
	}, (err) => {
	 // Handle error
	 console.log(err)
	 alert(err)
	});



  }

  loadData() {

    this.storage.get('request')
    .then((val)=> {
      this.request = val
      console.log(this.request)
      this.newMessages()
    })
    .catch((err) => console.log(err))
    
  }

  newMessages() {

    let messagesRef = firebase.database().ref(`messages/${this.request._id}`)

    /*firebase.firestore().collection('walks').doc(`${this.request._id}`).collection('messages')
    .onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        snapshot.docChanges.forEach((change) => {
          if (change.type === 'added') {
            this.messages.push(change.doc.data().message)
          }
        })
      })

    })*/

     messagesRef.on('child_added', (data) => {
       console.log(data.val())
       this.messages.push(data.val().message)

       if (data.val().message.from === 'client') {
           this.events.publish('message:received', data.val())
       }
     })


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
           //this.pic = snap.downloadURL
           let message = { url : snap.downloadURL, type: 'image', from : 'walker'}

      let messagesRef = firebase.database().ref(`messages/${this.request._id}`).push()
          .set({
            message : message
          })
          .then(() => console.log('success'))
          .catch((err) => console.log(err))
         })
       .catch((err) => console.log(err))

     }

     reader.readAsDataURL(file)

   }

  send() {

  	let message = { txt : this.newMessage, type: 'text', from: 'client'}

    /*firebase.firestore().collection('walks').doc(`${this.request._id}`).collection('messages')
      .add({
        message : message
      })
      .then(() => console.log('success'))
      .catch((err) => console.log(err))*/


      let messagesRef = firebase.database().ref(`messages/${this.request._id}`).push()
      .set({
        message : message
      })
      .then(() => console.log('success'))
      .catch((err) => console.log(err))


      this.newMessage = ''

    }

  }
