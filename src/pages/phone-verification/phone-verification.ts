import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController, NavController } from 'ionic-angular';
import firebase from 'firebase';
import { Firebase } from '@ionic-native/firebase';
import { OtpPage } from '../otp/otp';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
    selector: 'page-phone-verification',
    templateUrl: 'phone-verification.html',
})
export class PhoneVerificationPage {

    public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
    verificationId: any = '';
    phoneNumber: any = '';
    countryCode: any = '';
    result: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseIonic: Firebase) {
    }

    ionViewDidLoad() {
        this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        console.log(this.recaptchaVerifier)
        console.log('ionViewDidLoad PhoneVerificationPage');
    }

    // OtpScreen() {
    //     this.countryCode = '+' + this.phoneNumber.substring(0, 2);
    //     this.phoneNumber = this.phoneNumber.substring(2, 13);
    //     console.log(this.countryCode, this.phoneNumber);
    // }

    signIn(phoneNumber: number) { 
        console.log('Phone numver', phoneNumber);
        let number = '+' + this.phoneNumber;
        this.firebaseIonic.verifyPhoneNumber(number,60).then((result) =>{
            console.log(result)
            var verificationId = result.verificationId;
            this.navCtrl.push(OtpPage, { verificationid: verificationId });
        }, error => {
            alert(error)
            console.log(error)
        }).catch(error => {
            alert(error)
            console.log(error)
        })
    }
}
