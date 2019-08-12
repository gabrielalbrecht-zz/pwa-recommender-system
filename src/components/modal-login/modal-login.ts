import { UserServicesProvider } from './../../providers/user-services/user-services';
import { CreateAccountPage } from './../../pages/create-account/create-account';
import { Component } from '@angular/core';
import { ViewController, NavController, Events, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Login } from './../../models/login';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'modal-login',
	templateUrl: 'modal-login.html'
})
export class ModalLoginComponent {

	public login: Login;
	public loading: any;

	constructor(
		public viewCtrl: ViewController,
		public navCtrl: NavController,
		public navParams: NavParams,
		private _userServices: UserServicesProvider,
		private storage: Storage,
		public events: Events,
		public loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController
	) {
		this.login = new Login();
	}

	dismiss() {
		let data = { 'foo': 'bar' };
		this.viewCtrl.dismiss(data);
	}

	handleLogin() {
		let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
		loading.present();
		if (!this.login.email || !this.login.password) {
			let alert = this.alertCtrl.create({ subTitle: "Os campos devem ser preenchidos!", buttons: ['OK'] });
			loading.dismiss();
			alert.present();
			return;
		}

		this._userServices.login(this.login)
			.subscribe((res: any) => {
				if (!res.success) {
					let alert = this.alertCtrl.create({ subTitle: res.message, buttons: ['OK'] });
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
				this.dismiss();

				let toast = this.toastCtrl.create({
					message: 'Login realizado!',
					duration: 3000,
					position: 'top'
				});

				toast.present();

				this.events.publish('user:loggedIn', res.user);
			}, (error: Error) => {
				console.log("Error: " + error.message);
			});
	}

	createAccount() {
		this.navCtrl.push(CreateAccountPage);
		let data = { 'foo': 'bar' };
		this.viewCtrl.dismiss(data);
	}
}
