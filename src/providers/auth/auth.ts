import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { usercreds } from '../../models/interfaces/usercreds';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

    constructor(public afireauth: AngularFireAuth) {

    }

    /*
        For logging in a particular user. Called from the login.ts file.
      
    */

    login(credentials: usercreds) {

        var promise = new Promise((resolve, reject) => {
            this.afireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then((info) => {
                resolve(info);
            }).catch((err) => {
                reject(err);
            })
        })
        return promise;
    }

    checkUserIsLoggedIn(){
        var promise = new Promise((resolve,reject) => {
            this.afireauth.auth.onAuthStateChanged(user => {
                console.log('User Logged in',user);
                resolve(user);
            }, (error) => {
                console.log('No Logged In user',error);
                reject(false);
            })
        })
        return promise;
    }

    loginotp(phone,verfier) {
        var promise = new Promise((resolve, reject) => {
            this.afireauth.auth.signInWithPhoneNumber('+918574164500',verfier).then((info) => {
                console.log(info)
                resolve(info);
            }).catch((err) => {
                reject(err);
            })
        })
        return promise;
    }
}
