import { Component } from '@angular/core';
import { MePage } from '../me/me';
import { ContactsPage } from '../contacts/contacts';
import { ChatsPage } from '../chats/chats';
import { DiaryPage } from '../diary/diary';
import { GalleryPage } from '../gallery/gallery';
import { ContactsProvider } from '../../providers/contacts/contacts';

@Component({
    templateUrl: 'tabs.html',
})
export class TabsPage {

    tab1Root = ChatsPage;
    tab2Root = ContactsPage;
    tab3Root = DiaryPage;
    tab4Root = GalleryPage;
    tab5Root = MePage;


    public invitationRequest = []

    constructor(public contactservice: ContactsProvider) {
        console.log("html")
    }

    ionViewWillEnter() {
        this.fetchFriendsRequest()
        this.invitationRequest = this.contactservice.friendRequestProfile
    }

    fetchFriendsRequest() {
        console.log('Fetching Friend Request')
        this.contactservice.friendsRequest()
    }

}
