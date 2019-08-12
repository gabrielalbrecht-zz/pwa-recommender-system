import { VideoPlayerPage } from './../video-player/video-player';
import { LearningMaterial } from './../../models/learningMaterial';
import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, Events, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { ModalLoginComponent } from '../../components/modal-login/modal-login';
import { Storage } from '@ionic/storage';
import { RecommenderServicesProvider } from '../../providers/recommender-services/recommender-services';
import { UserServicesProvider } from '../../providers/user-services/user-services';
import { User } from '../../models/user';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	public user : User = new User();
	public sessionId : string;
	public loggedIn: boolean;
	public query: String = "";

	public learningMaterials: LearningMaterial[] = null;

	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		public navParams: NavParams,
		public storage: Storage,
		public recommenderServices: RecommenderServicesProvider,
		public events: Events,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		public toastCtrl: ToastController,
		public _userServices: UserServicesProvider,
	) {
		events.subscribe('user:loggedIn', (user) => {
			this.loggedIn = true;
			this.user = user;
		});

		events.subscribe('user:loggedOut', () => {
			this.loggedIn = false;
		});
	}

	ionViewDidEnter() {
		this.storage.get('loggedIn').then((val) => {
			this.loggedIn = val;

			if (!val) {
				this.showModalLogin();
				return;
			}

			this.storage.get('id').then((val) => {
				this.user.id = val;

				this.storage.get('sessionId').then((val) => {
					this.sessionId = val;

					this.handleAutoLogin();
				})
			})
		});
	}

	showModalLogin() {
		let modalLogin = this.modalCtrl.create(ModalLoginComponent);
		modalLogin.present();
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

	search() {
		let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
		loading.present();
		this.recommenderServices.getLearningMaterials(this.query)
			.subscribe((data: any) => {
				if (data.success) {
					this.learningMaterials = data.videos;
					loading.dismiss();
					return;
				}

				loading.dismiss();
				let alert = this.alertCtrl.create({
					subTitle: "Erro ao pesquisar materiais!",
					buttons: [ "OK" ]
				});

				alert.present();
			}, (error) => {
				console.log('Error: ' + error);

				loading.dismiss();
				let alert = this.alertCtrl.create({
					subTitle: "Erro ao pesquisar materiais!",
					buttons: [ "OK" ]
				});

				alert.present();
			});
	}

	watch(learningMaterial: LearningMaterial) {
		this.navCtrl.push(VideoPlayerPage, { learningMaterial: learningMaterial });
	}

	keyupSearch(event) {
		if (event.charCode == 13) {
			this.search();
		}
	}

	handleAutoLogin() {
		this._userServices.autoLogin(this.sessionId).subscribe(
			(res: any) => {
				if (!res.success) {
					this.storage.clear();
					this.events.publish('user:loggedOut');
					return;
				}

				this.storage.set("loggedIn", "true");
				this.storage.set("id", res.user.id);
				this.storage.set("email", res.user.email);
				this.storage.set("fullname", res.user.fullname);
				this.storage.set("image", res.user.image);
				this.storage.set("sessionId", res.user.session.sessionId);

				this.events.publish('user:loggedIn', res.user);
			}, (error: Error) => {
				console.log("Error: " + error.message);
				this.storage.clear();
					this.events.publish('user:loggedOut');
			});
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

}
