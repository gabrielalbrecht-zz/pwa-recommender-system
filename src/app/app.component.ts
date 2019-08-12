import { ModalLoginComponent } from './../components/modal-login/modal-login';
import { Storage } from '@ionic/storage';
import { MyAccountPage } from './../pages/my-account/my-account';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, Events, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { User } from '../models/user';
import { UserServicesProvider } from '../providers/user-services/user-services';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = HomePage;

	pages: Array<{ title: string, component: any, method: any, icon: String }>;

	public user: User;

	public sessionId: string;

	public loggedIn: boolean;

	constructor(
		public platform: Platform,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen,
		public storage: Storage,
		private modalCtrl: ModalController,
		public events: Events,
		public loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private _userServices: UserServicesProvider,
	) {
		this.user = new User();

		this.initializeApp();

		this.refreshUser();

		this.pages = [
			{ title: 'Início', component: HomePage, method: (c) => { this.nav.setRoot(c) }, icon: 'home' },
			{ title: 'Minha conta', component: MyAccountPage, method: (c, user) => { this.nav.push(c, { user: this.user, sessionId: this.sessionId }) }, icon: 'person' },
		];

		events.subscribe('user:loggedIn', (user) => {
			this.user = user;
			this.user.image = user.image ? user.image : "/assets/imgs/no-profile.jpg";
			this.sessionId = user.session.sessionId;
		});

		events.subscribe('user:loggedOut', () => {
			this.loggedIn = false;
		});
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	logout() {
		let alert = this.alertCtrl.create({
			subTitle: "Deseja fazer logout?",
			buttons: [
				{
					text: "Sim",
					handler: () => {
						this.handleLogout()
					}
				}, {
					text: "Não"
				}
			]
		});

		alert.present();
	}

	handleLogout() {
		let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
		loading.present();

		this._userServices.logout(this.sessionId).subscribe((res: any) => {
			if (!res.success) {
				loading.dismiss();
				let alert = this.alertCtrl.create({ subTitle: res.message, buttons: ['OK'] });
				alert.present();
				return;
			}

			this.storage.clear();
			this.events.publish('user:loggedOut');
			loading.dismiss();

			let toast = this.toastCtrl.create({
				message: 'Logout realizado!',
				duration: 3000,
				position: 'top'
			});

			toast.present();
		}, (error: Error) => {
			console.log("Error: " + error.message);
			loading.dismiss();
		});
	}

	showModalLogin() {
		let modalLogin = this.modalCtrl.create(ModalLoginComponent);
		modalLogin.present();
	}

	refreshUser() {
		this.storage.get('loggedIn').then((val) => {
			this.loggedIn = val;
		});

		this.storage.get('fullname').then((val) => {
			this.user.fullname = val;
		});

		this.storage.get('email').then((val) => {
			this.user.email = val;
		});

		this.storage.get('image').then((val) => {
			this.user.image = val ? val : "../assets/imgs/no-profile.jpg";
		});

		this.storage.get('id').then((val) => {
			this.user.id = val;
		});

		this.storage.get('sessionId').then((val) => {
			this.sessionId = val;
		});
	}
}
