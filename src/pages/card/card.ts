import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { BookWalkPage } from '../book-walk/book-walk'
import { Storage } from '@ionic/storage'

/**
 * Generated class for the CardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var Stripe 

 @IonicPage()
 @Component({
 	selector: 'page-card',
 	templateUrl: 'card.html',
 })
 export class CardPage {

 	constructor(public navCtrl: NavController, public navParams: NavParams, 
 		public viewCtrl : ViewController,
 		private storage : Storage) {
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad CardPage');
 		this.stripeForm()

 	}

 	stripeForm() {


 		const stripe = Stripe('pk_test_X4e4j9vjugu035qSD2tlpI4x')  	 

	// Create an instance of Elements
	const elements = stripe.elements();

	// Custom styling can be passed to options when creating an Element.
	// (Note that this demo uses a wider set of styles than the guide below.)
	var style = {
		base: {
			color: '#32325d',
			lineHeight: '18px',
			fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
			fontSmoothing: 'antialiased',
			fontSize: '16px',
			'::placeholder': {
				color: '#aab7c4'
			}
		},
		invalid: {
			color: '#fa755a',
			iconColor: '#fa755a'
		}
	};

	// Create an instance of the card Element
	var card = elements.create('card', {style: style});

	// Add an instance of the card Element into the `card-element` <div>
	card.mount('#card-element');

	// Handle real-time validation errors from the card Element.
	card.addEventListener('change', function(event) {
		var displayError = document.getElementById('card-errors');
		if (event.error) {
			displayError.textContent = event.error.message;
		} else {
			displayError.textContent = '';
		}
	});

	const form = document.getElementById('payment-form');
	form.addEventListener('submit', async (event) => {
		event.preventDefault();

		const {token, error} = await stripe.createToken(card);

		if (error) {
    	// Inform the customer that there was an error
    	const errorElement = document.getElementById('card-errors');
   		 errorElement.textContent = error.message;
		} else {
		    // Send the token to your server
		    this.stripeHandler(token);
		}
	})


	}

stripeHandler = (token) => {
	console.log(token)
	const form = <HTMLFormElement>document.getElementById('payment-form');
	//this.viewCtrl.dismiss()
	this.storage.set('token', token.id)
	//form.submit()
	this.navCtrl.push(BookWalkPage)
}

close() {
	this.viewCtrl.dismiss()
}


}
