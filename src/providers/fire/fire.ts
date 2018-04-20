import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'

import * as firebase from 'firebase'

/*
  Generated class for the FireProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FireProvider {

	public user : Observable<any>

  constructor(public http: Http) {
    console.log('Hello FireProvider Provider');
  }

  async request(data, walker_id, uid) {

  	let requestKey = firebase.database().ref().push().key

  	const request = {}
    request['/requests/' + '101010' + '/' + requestKey ] = data
    request['/walk-requests/' + uid + '/' + requestKey] = data

    return firebase.database().ref().update(request)
    
  }

  async createUser(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((val) => {
        return val
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((val) => {
        console.log(val)

      })
      .catch((err) => {
        console.log(err)
      })
  }

}
