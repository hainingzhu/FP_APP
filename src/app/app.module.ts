import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Firebase } from '@ionic-native/firebase';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { firebaseConfig } from '../config';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { MePage } from '../pages/me/me';
import { LandingPage } from '../pages/landing/landing';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { OtpPage } from '../pages/otp/otp';
import { PhoneVerificationPage } from '../pages/phone-verification/phone-verification';
import { ContactsPage } from '../pages/contacts/contacts';
import { ContactsProvider } from '../providers/contacts/contacts';
import { ChatsPage } from '../pages/chats/chats';
import { GalleryPage } from '../pages/gallery/gallery';
import { DiaryPage } from '../pages/diary/diary';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    LoginPage,
    TabsPage,
    MePage,
    LandingPage,
    ContactsPage,
    OtpPage,
    PhoneVerificationPage,
    ChatsPage,
    GalleryPage,
    DiaryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    LoginPage,
    MePage,
    LandingPage,
    ContactsPage,
    OtpPage,
    PhoneVerificationPage,
    ChatsPage,
    GalleryPage,
    DiaryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Firebase,
    AuthProvider,
    UserProvider,
    Camera,
    FileTransfer,
    ContactsProvider
  ]
})
export class AppModule { }
