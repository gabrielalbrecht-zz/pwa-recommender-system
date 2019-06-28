import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Events } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UserServicesProvider } from '../../providers/user-services/user-services';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
	selector: 'page-my-account',
	templateUrl: 'my-account.html',
})
export class MyAccountPage {

	public user: User;
	public userId: String;

	public loading: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private camera: Camera,
		private _userServices: UserServicesProvider,
		private storage: Storage,
		public loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		public events: Events,
	) {
		this.user = new User();
		this.userId = this.navParams.get("userId");
		this._userServices.getById(this.userId)
			.subscribe((res: any) => {
				if (!res.success) {
					let alert = this.alertCtrl.create({
						subTitle: res.message,
						buttons: ['OK']
					});

					alert.present();
					navCtrl.pop();
					return;
				}
				this.user = res.user;
			}, (error) => {
				console.log("Error");
			});

		this.loading = loadingCtrl.create({ content: 'Por favor aguarde...' });
	}

	handleEditUser() {
		let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
		if (!this.user.email || !this.user.fullname) {
			let alert = this.alertCtrl.create({
				subTitle: "Os campos devem ser preenchidos!",
				buttons: ['OK']
			});

			loading.dismiss();

			alert.present();
			return;
		}

		this._userServices.modifyById(this.user)
			.subscribe((res: any) => {
				if (!res.success) {
					let alert = this.alertCtrl.create({
						subTitle: res.message,
						buttons: ['OK']
					});

					loading.dismiss();

					alert.present()
					return;
				}

				this.storage.set("id", res.user.id);
				this.storage.set("email", res.user.email);
				this.storage.set("fullname", res.user.fullname);
				this.storage.set("image", res.user.image);

				loading.dismiss();
				this.navCtrl.pop();

				let toast = this.toastCtrl.create({
					message: 'Conta alterada!',
					duration: 3000,
					position: 'top'
				});

				toast.present();

				this.events.publish('user:loggedIn', res.user);
			}, (error: Error) => {
				loading.dismiss();
				console.log("Error: " + error.message);
			});
	}

	getPhoto() {
		const options: CameraOptions = {
			quality: 70,
			destinationType: this.camera.DestinationType.DATA_URL,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
			saveToPhotoAlbum: false,
			allowEdit: true,
			targetWidth: 60,
			targetHeight: 60
		}

		this.camera.getPicture(options).then((imageData) => {
			this.user.image = 'data:image/jpeg;base64,' + imageData;
		}, (err) => {
		});
	}

}
