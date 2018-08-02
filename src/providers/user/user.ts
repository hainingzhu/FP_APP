import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class UserProvider {
    firedata = firebase.database().ref('/users');
    firestore = firebase.firestore();

    constructor(public afireauth: AngularFireAuth) {

    }

    /*
    Adds a new user to the system.
    Called from - signup.ts
    Inputs - The new user object containing the email, password and displayName.
    Outputs - Promise.
    
     */

    adduser(newuser) {
        var promise = new Promise((resolve, reject) => {
            this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
                this.afireauth.auth.currentUser.updateProfile({
                    displayName: newuser.displayName,
                    photoURL: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
                }).then(() => {
                    this.firedata.child(this.afireauth.auth.currentUser.uid).set({
                        uid: this.afireauth.auth.currentUser.uid,
                        displayName: newuser.displayName,
                        photoURL: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
                    }).then(() => {
                        resolve({ success: true });
                    }).catch((err) => {
                        reject(err);
                    })
                }).catch((err) => {
                    reject(err);
                })
            }).catch((err) => {
                reject(err);
            })
        })
        return promise;
    }

    /*
    For resetting the password of the user.
    Called from - passwordreset.ts
    Inputs - email of the user.
    Output - Promise.
    
     */

    passwordreset(email) {
        var promise = new Promise((resolve, reject) => {
            firebase.auth().sendPasswordResetEmail(email).then(() => {
                resolve({ success: true });
            }).catch((err) => {
                reject(err);
            })
        })
        return promise;
    }

    /*
    
    For updating the users collection and the firebase users list with
    the imageurl of the profile picture stored in firebase storage.
    Called from - profilepic.ts
    Inputs - Url of the image stored in firebase.
    OUtputs - Promise.
    
    */

    updateimage(imageurl) {
        var promise = new Promise((resolve, reject) => {
            this.afireauth.auth.currentUser.updateProfile({
                displayName: this.afireauth.auth.currentUser.displayName,
                photoURL: imageurl
            }).then(() => {
                firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
                    displayName: this.afireauth.auth.currentUser.displayName,
                    photoURL: imageurl,
                    uid: firebase.auth().currentUser.uid
                }).then(() => {
                    resolve({ success: true });
                }).catch((err) => {
                    reject(err);
                })
            }).catch((err) => {
                reject(err);
            })
        })
        return promise;
    }

    updatedisplayname(newname) {
        var promise = new Promise((resolve, reject) => {
            this.afireauth.auth.currentUser.updateProfile({
                displayName: newname,
                photoURL: this.afireauth.auth.currentUser.photoURL
            }).then(() => {
                this.firedata.child(firebase.auth().currentUser.uid).update({
                    displayName: newname,
                    photoURL: this.afireauth.auth.currentUser.photoURL,
                    uid: this.afireauth.auth.currentUser.uid
                }).then(() => {
                    resolve({ success: true });
                }).catch((err) => {
                    reject(err);
                })
            }).catch((err) => {
                reject(err);
            })
        })
        return promise;
    }

    getallusers() {
        var promise = new Promise((resolve, reject) => {
            this.firedata.orderByChild('uid').once('value', (snapshot) => {
                let userdata = snapshot.val();
                let temparr = [];
                for (var key in userdata) {
                    temparr.push(userdata[key]);
                }
                resolve(temparr);
            }).catch((err) => {
                reject(err);
            })
        })
        return promise;
    }

    updateuserprofile(profile) {
        var promise = new Promise((resolve, reject) => {
            var uid = firebase.auth().currentUser.uid;
            console.log('Uid', uid)
            console.log('profile', profile)
            profile.id = uid;
            this.firestore.doc(`users/${uid}`).set(profile, { merge: true }).then(result => {
                resolve(true)
            }).catch(error => {
                console.log(error)
                reject(false)
            })
        })

        return promise;
    }

    getuserprofile() {
        var promise = new Promise((resolve, reject) => {
            var uid = firebase.auth().currentUser.uid;
            var t = this.firestore.doc(`users/${uid}`).get().then(result => {
                if (result.exists) {
                    resolve(result.data())
                } else {
                    console.log('User Data does not exists')
                    resolve(false)
                }
            }).catch(error => {
                console.log('getuserprofile error', error)
                reject(false)
            })
        })
        return promise;
    }

    searchUser() {
        var promise = new Promise((resolve, reject) => {
            console.log('searching user')
            this.firestore.collection('users').where('facestudio_id', '==', 'nitishxp@gmail.com').get().then((result) => {
                result.docs.map((element: any) => {
                    console.log(element.data())
                })
                console.log(result.empty);
            })
        })
        return promise;
    }
}
