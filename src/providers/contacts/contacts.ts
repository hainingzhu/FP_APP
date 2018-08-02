import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Events } from 'ionic-angular';

@Injectable()
export class ContactsProvider {

    firedata = firebase.database().ref('/users');
    firestore = firebase.firestore();
    uid = firebase.auth().currentUser.uid;

    friendRequestIds = [];
    public friendRequestProfile = [];

    constructor(public events: Events) {
        console.log('Hello ContactsProvider Provider');
    }

    searchUser(search) {
        let resultArray = []
        console.log('Searching User')
        var usersRef = this.firestore.collection('users');
        var queryRef = usersRef.where('facestudio_id', '==', search);
        var promise = new Promise((resolve, reject) => {
            queryRef.get().then(result => {
                if (result.empty) {
                    resolve(resultArray)
                }
                result.forEach(doc => {
                    if (doc.data().id != this.uid)
                        resultArray.push(doc.data())
                })
                resolve(resultArray)
            }).catch(error => {
                console.log('Error While Searching for user ', error)
                reject(resultArray)
            })
        })

        return promise
    }

    sendRequest(id) {
        let uid = this.uid;
        let requestSend = {}
        requestSend[uid] = true
        this.firestore.doc(`userscontactspending/${id}`).set(requestSend, { merge: true }).then(result => {
            console.log(result)
        }).catch(error => {
            console.log(error)
        })
    }

    friendsRequest() {
        let cons = this
        let uid = this.uid;
        this.friendRequestIds = []
        this.firestore.doc(`userscontactspending/${uid}`).onSnapshot(function (doc) {
            let resultArray = []
            if (doc.exists) {
                let list = doc.data()
                console.log(list)
                for (var id in list) {
                    resultArray.push(id)
                }
                cons.friendRequestIds = resultArray;
                cons.friendRequestProfile.length = 0;
                cons.fetchFriendRequestProfile()
            }
        })
    }


    fetchFriendRequestProfile() {
        for (var i in this.friendRequestIds) {
            let id = this.friendRequestIds[i]
            this.firestore.doc(`users/${id}`).get().then(result => {
                if (result.exists) {
                    this.friendRequestProfile.push(result.data())
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }

    deleteRequest(id) {
        let uid = this.uid;
        let deleteD = {};
        deleteD[id] = firebase.firestore.FieldValue.delete()
        this.firestore.doc(`userscontactspending/${uid}`).update(deleteD)
    }

    // here need to append on bothside i.e
    // the user who have send request
    // and the user who have accept friend request
    acceptRequest(id) {

        let uid = this.uid;
        let crequestSend = {}
        crequestSend[id] = true

        var promise = new Promise((resolve, reject) => {
            // update the current user
            this.firestore.doc(`contacts/${uid}`).set(crequestSend, { merge: true }).then(result => {
                // update the other user
                let orequestSend = {}
                orequestSend[uid] = true
                this.firestore.doc(`contacts/${id}`).set(orequestSend, { merge: true }).then(result => {
                    this.deleteRequest(id);
                    resolve(true)
                }).catch(error => {
                    console.log('Error While adding friendlist', error)
                    reject(false);
                })
            }).catch(error => {
                console.log('Error While adding friendlist', error)
                reject(false);
            })
        })

        return promise
    }
}
