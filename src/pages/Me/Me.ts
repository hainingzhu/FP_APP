import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';

@Component({
    templateUrl: 'me.html',
})
export class MePage {

    imageURI: any;
    imageFileName: any;
    profile = {
        name: "",
        facestudio_id: "",
        occupation: "",
        gender: "",
        age: "",
        bio: "",
        profile_pic: "https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e"
    }
    constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider, private transfer: FileTransfer,
        private camera: Camera, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {

    }

    ionViewWillEnter() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        // this.userservice.searchUser().then(result => {

        // })
        loading.present();
        this.userservice.getuserprofile().then(result => {
            console.log('User Profile me', result)
            this.profile.name = result['name'];
            this.profile.occupation = result['occupation'] ? result['occupation'] : "";
            this.profile.gender = result['gender'] ? result['gender'] : "";
            this.profile.age = result['age'] ? result['age'] : "";
            this.profile.bio = result['bio'] ? result['bio'] : "";
            this.profile.facestudio_id = result['facestudio_id'] ? result['facestudio_id'] : ""
            loading.dismiss()
        }).catch(error => {
            console.log(error)
        })

    }

    saveProfile() {
        this.userservice.updateuserprofile(this.profile).then(result => {
            alert('Profile Updated')
        }).catch(error => {
            alert(error)
        })
    }

    getImage() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        }

        this.camera.getPicture(options).then((imageData) => {
            this.imageURI = imageData;
            console.log(this.imageURI)
        }, (err) => {
            console.log(err);
            this.presentToast(err);
        });

    }

    presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

}
