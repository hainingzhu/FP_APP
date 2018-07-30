import { Component } from '@angular/core';

import { DiaryPage } from '../Diary/Diary';
import { ContactPage } from '../contact/contact';
import { ChatsPage } from '../Chats/Chats';
import { GalleryPage } from '../Gallery/Gallery';
import { MePage } from '../Me/Me';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ChatsPage;
  tab2Root = ContactPage;
  tab3Root = DiaryPage;
  tab4Root = GalleryPage;
  tab5Root = MePage;


  constructor() {

  }
}
