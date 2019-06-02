import { ModalLoginComponent } from './../components/modal-login/modal-login';
import { Storage } from '@ionic/storage';
import { MyAccountPage } from './../pages/my-account/my-account';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = HomePage;

	pages: Array<{ title: string, component: any, icon: String }>;
	loggedPages: Array<{ title: string, component: any, icon: String }>;

	public loggedIn: boolean;

	constructor(public platform: Platform,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen,
		private storage: Storage,
		private app: App,
		private modalCtrl: ModalController,
	) {

		this.initializeApp();

		this.pages = [
			{ title: 'Início', component: HomePage, icon: 'home' },
			{ title: 'Minha conta', component: MyAccountPage, icon: 'person' },
		];
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	openPage(page) {
		this.nav.setRoot(page.component);
	}

	logout() {
		this.storage.set("loggedIn", false);
		this.app.getRootNav().setRoot(HomePage);
	}

	showModalLogin() {
		let modalLogin = this.modalCtrl.create(ModalLoginComponent);
		modalLogin.present();
	}
}
