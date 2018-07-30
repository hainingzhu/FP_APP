import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { DiaryPage } from '../pages/Diary/Diary';
import { ContactPage } from '../pages/contact/contact';
import { ChatsPage } from '../pages/Chats/Chats';
import { TabsPage } from '../pages/tabs/tabs';
import { GalleryPage } from '../pages/Gallery/Gallery';
import { MePage } from '../pages/Me/Me';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    DiaryPage,
    ContactPage,
    ChatsPage,
    MePage,
    GalleryPage
	TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DiaryPage,
    ContactPage,
    ChatsPage,
    MePage,
    GalleryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
