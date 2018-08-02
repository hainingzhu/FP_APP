import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { UserProvider } from '../../providers/user/user';
import { TabsPage } from '../tabs/tabs';

@Component({
    selector: 'page-landing',
    templateUrl: 'landing.html',
})
export class LandingPage {

    profile = {
        role: "",
        name: "",
        facestudio_id: firebase.auth().currentUser.phoneNumber,
        landing: true
    }
    constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider) {
        this.userservice.getuserprofile().then(result => {
            console.log('User Profile Landing Page')
            if (result['landing']) {
                this.navCtrl.setRoot(TabsPage);
            }
        }, error => {
            console.log(error)
        }).catch( error =>{
            console.log(error)
        })
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad LandingPage');
    }

    saveProfile() {
        this.userservice.updateuserprofile(this.profile).then(result => {
            console.log('Saved Role Data')
            this.navCtrl.setRoot(TabsPage);
        }, error => {
            console.log(error)
        })
    }

}
