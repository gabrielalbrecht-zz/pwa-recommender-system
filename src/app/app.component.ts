import { ModalLoginComponent } from './../components/modal-login/modal-login';
import { Storage } from '@ionic/storage';
import { MyAccountPage } from './../pages/my-account/my-account';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, Events, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { User } from '../models/user';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = HomePage;

	pages: Array<{ title: string, component: any, method: any, icon: String }>;

	public user: User;
	public loggedIn: boolean;
	public loading: any;

	constructor(
		public platform: Platform,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen,
		public storage: Storage,
		private modalCtrl: ModalController,
		public events: Events,
		public loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController
	) {
		this.user = new User();

		this.initializeApp();

		this.refreshUser();

		this.pages = [
			{ title: 'Início', component: HomePage, method: (c) => { this.nav.setRoot(c) }, icon: 'home' },
			{ title: 'Minha conta', component: MyAccountPage, method: (c, user) => { this.nav.push(c, { userId: user }) }, icon: 'person' },
		];

		events.subscribe('user:loggedIn', (user) => {
			this.user = user;
		});

		events.subscribe('user:loggedOut', () => {
			this.loggedIn = false;
		});

		this.loading = loadingCtrl.create({ content: 'Por favor aguarde...' });
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
						let loading = this.loading;
						loading.present();
						this.storage.set("loggedIn", false);
						this.events.publish('user:loggedOut');
						loading.dismiss();

						let toast = this.toastCtrl.create({
							message: 'Logout realizado!',
							duration: 3000,
							position: 'top'
						});

						toast.present();
					}
				}, {
					text: "Não"
				}
			]
		});

		alert.present();
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
			this.user.image = val;
		});

		this.storage.get('id').then((val) => {
			this.user.id = val;
		});
	}
}
