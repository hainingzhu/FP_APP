import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ContactsProvider } from '../../providers/contacts/contacts';

@Component({
    selector: 'page-contacts',
    templateUrl: 'contacts.html',
})
export class ContactsPage {

    public myInput: any;
    public displayList: any;
    public userContacts: any;
    public searchUserList: any;
    public invitationRequest = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private contactservice: ContactsProvider, public events: Events) {
    }

    ionViewWillEnter() {
        this.invitationRequest = this.contactservice.friendRequestProfile;
        this.fetchUserContactList()
    }

    ionViewDidLeave() {
        this.events.unsubscribe('gotfriendlistids');
        this.events.unsubscribe('fetchrequestprofile');
    }

    onInput(event) {
        this.contactservice.searchUser(this.myInput).then(result => {
            console.log(result)
            this.displayList = result
        }).catch(error => {
            console.log(error)
        })
    }

    oncancel(event) {
        // console.log(event)
    }

    fetchUserContactList() {

    }

    sendRequest(id) {
        console.log(id);
        this.contactservice.sendRequest(id);
    }

    acceptRequest(id) {
        this.contactservice.acceptRequest(id).then(result => {
            alert('Friend Request Accepted')
        }).catch(error => {
            console.log('Error')
        })
    }

    deleteRequest(id) {
        this.contactservice.deleteRequest(id)
    }
}
