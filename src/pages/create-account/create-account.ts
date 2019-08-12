import { Storage } from '@ionic/storage';
import { UserServicesProvider } from './../../providers/user-services/user-services';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { Ng2ImgMaxService } from 'ng2-img-max';

@IonicPage()
@Component({
	selector: 'page-create-account',
	templateUrl: 'create-account.html',
})
export class CreateAccountPage {
	public user: User;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private _userServices: UserServicesProvider,
		private storage: Storage,
		public events: Events,
		public loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private ng2ImgMaxService: Ng2ImgMaxService
	) {
		this.user = new User();
		this.user.image = "/assets/imgs/no-profile.jpg";
	}

	changeListener($event): void {
		this.getBase64Image($event.target.files[0])
	}

	getBase64Image(file) {
		if (!file) {
			this.user.image = "/assets/imgs/no-profile.jpg";
			return;
		}

		const maxHeight = 60;
		const maxWidth = 60;

		let self = this;
		this.ng2ImgMaxService.resizeImage(file, maxHeight, maxWidth).subscribe(
			result => {
				let reader = new FileReader();
				reader.readAsDataURL(result);
				reader.onloadend = function () {
					self.user.image = reader.result.toString();
				}
				reader.onerror = function (error) {
					self.user.image = "/assets/imgs/no-profile.jpg";
				};
			},
			error => {
				self.user.image = "/assets/imgs/no-profile.jpg";
			}
		);
	}

	handleCreateUser() {
		let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
		if (!this.user.email || !this.user.password || !this.user.fullname) {
			let alert = this.alertCtrl.create({
				subTitle: "Os campos devem ser preenchidos!",
				buttons: ['OK']
			});

			loading.dismiss();

			alert.present();
			return;
		}

		this._userServices.createUser(this.user)
			.subscribe((res: any) => {
				if (!res.success) {
					let alert = this.alertCtrl.create({
						subTitle: res.message,
						buttons: ['OK']
					});

					loading.dismiss();

					alert.present();
					return;
				}

				this.storage.set("loggedIn", "true");
				this.storage.set("id", res.user.id);
				this.storage.set("email", res.user.email);
				this.storage.set("fullname", res.user.fullname);
				this.storage.set("image", res.user.image);
				this.storage.set("sessionId", res.user.session.sessionId);

				loading.dismiss();
				this.navCtrl.pop();

				let toast = this.toastCtrl.create({
					message: 'Conta criada!',
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
}
