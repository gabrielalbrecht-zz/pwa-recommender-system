import { MyApp } from './../../app/app.component';
import { HomePage } from './../../pages/home/home';
import { UserServicesProvider } from './../../providers/user-services/user-services';
import { CreateAccountPage } from './../../pages/create-account/create-account';
import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, App, Events } from 'ionic-angular';
import { Login } from './../../models/login';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'modal-login',
	templateUrl: 'modal-login.html'
})
export class ModalLoginComponent {

	public login: Login;

	constructor(public viewCtrl: ViewController,
		public navCtrl: NavController,
		public navParams: NavParams,
		private _userServices: UserServicesProvider,
		private app: App,
		private storage: Storage) {

		this.login = new Login();
	}

	dismiss() {
		let data = { 'foo': 'bar' };
		this.viewCtrl.dismiss(data);
	}

	handleLogin() {
		if (!this.login.email || !this.login.password) {
			console.log("Os campos devem ser preenchidos" + this.login.email + ".")
			return;
		}

		this._userServices.login(this.login)
			.subscribe((res: any) => {
				if (!res.success) {
					console.log(res.message);
					return;
				}
				this.storage.set("loggedIn", "true");

				this.app.getRootNav().setRoot(MyApp);
				this.dismiss();
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
