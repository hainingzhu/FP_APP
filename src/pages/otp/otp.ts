import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { Firebase } from '@ionic-native/firebase';
import { LandingPage } from '../landing/landing';


@IonicPage()
@Component({
    selector: 'page-otp',
    templateUrl: 'otp.html',
})
export class OtpPage {

    verification_id: any;
    otp: string = '';
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.verification_id = this.navParams.get('verificationid');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad OtpPage');
    }

    roleSelection() {
        var signInCredential = firebase.auth.PhoneAuthProvider.credential(this.verification_id, this.otp);
        firebase.auth().signInWithCredential(signInCredential).then(() => {
            console.log(signInCredential);
            setTimeout(() => {
                alert('Otp Verified')
            }, 2000);
            this.navCtrl.setRoot(LandingPage);
        }).catch(() => {
            console.log('Erorr in OTP');
        });

    }

}
