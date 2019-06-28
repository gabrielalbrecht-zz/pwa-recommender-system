import { VideoPlayerPage } from './../video-player/video-player';
import { LearningMaterial } from './../../models/learningMaterial';
import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, Events, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { ModalLoginComponent } from '../../components/modal-login/modal-login';
import { Storage } from '@ionic/storage';
import { RecommenderServicesProvider } from '../../providers/recommender-services/recommender-services';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	public loggedIn: boolean;
	public query: String = "";

	public loading: any;

	public learningMaterials: LearningMaterial[] = null;

	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		public navParams: NavParams,
		private storage: Storage,
		public recommenderServices: RecommenderServicesProvider,
		public events: Events,
		public loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController
	) {
		this.loading = loadingCtrl.create({ content: 'Por favor aguarde...' });

		events.subscribe('user:loggedIn', (user) => {
			this.loggedIn = true;
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
			}
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

	search() {
		this.recommenderServices.getLearningMaterials(this.query)
			.subscribe((data: any) => {
				if (data.success) {
					this.learningMaterials = data.videos;
				}
			});
	}

	watch(learningMaterial: LearningMaterial) {
		this.navCtrl.push(VideoPlayerPage, { learningMaterial: learningMaterial });
	}
}
