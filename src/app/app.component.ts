import { Component } from '@angular/core';
import { Platform , LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { LandingPage } from '../pages/landing/landing';
import { PhoneVerificationPage } from '../pages/phone-verification/phone-verification';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = null;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public authservice: AuthProvider,
        public userservice: UserProvider, public loadingCtrl : LoadingController) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.checkIfUserIsLoginOrNot()
    }

    checkIfUserIsLoginOrNot() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        console.log('Check login url at app start')
        this.authservice.checkUserIsLoggedIn().then(result => {
            if (result) {
                this.userservice.getuserprofile().then(result => {
                    console.log('User Profile in app component', result)
                    if (result['landing'] == true) {
                        this.rootPage = TabsPage
                    } else {
                        this.rootPage = LandingPage
                    }
                }).catch( (error) => {
                    console.log(error)
                    console.log('No User Logged In found')
                    this.rootPage = LoginPage
                })
            }
            else
                this.rootPage = LoginPage
        }, err => {
            this.rootPage = LoginPage
        })
    }

}
