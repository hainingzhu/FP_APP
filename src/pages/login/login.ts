import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { usercreds } from '../../models/interfaces/usercreds';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { LandingPage } from '../landing/landing';
import { PhoneVerificationPage } from '../phone-verification/phone-verification'

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    credentials = {} as usercreds;
    constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    signin() {
        this.authservice.login(this.credentials).then((res: any) => {
            console.log(res, 'In login Page');
            this.navCtrl.setRoot(LandingPage);
        }, (error) => {
            console.log(error);
        })
    }

    signup() {
        this.navCtrl.push('SignupPage');
    }

    passwordreset() {
        this.navCtrl.push('PasswordresetPage');
    }

    otplogin() {
        this.navCtrl.setRoot(PhoneVerificationPage);
    }
}
