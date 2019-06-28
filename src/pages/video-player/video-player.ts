import { Rating } from './../../models/rating';
import { LearningMaterial } from './../../models/learningMaterial';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RatingServicesProvider } from '../../providers/rating-services/rating-services';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
	selector: 'page-video-player',
	templateUrl: 'video-player.html',
})
export class VideoPlayerPage {
	videoUrl: SafeResourceUrl;
	title: String = "";
	userId: String = "";
	loggedIn: boolean = false;

	learningMaterial: LearningMaterial;

	public loading: any;

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		private domSanitizer: DomSanitizer,
		private storage: Storage,
		private _ratingServices: RatingServicesProvider,
		public events: Events,
		private toastCtrl: ToastController,
		private alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
	) {

		events.subscribe('user:loggedIn', (user) => {
			this.userId = user.id;
		});

		events.subscribe('user:loggedOut', () => {
			this.loggedIn = false;
		});

		this.loading = loadingCtrl.create({ content: 'Por favor aguarde...' });
	}

	ionViewDidLoad() {
		this.storage.get('loggedIn').then((val) => {
			this.loggedIn = val;
		});

		this.storage.get('id').then((val) => {
			this.userId = val;
		});

		this.learningMaterial = this.navParams.get("learningMaterial");
		this.title = this.learningMaterial.title;
		this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.learningMaterial.videoId + "?feature=player_embedded");
	}

	likeLearningMaterial(rate: Number) {
		let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
		if (!this.loggedIn) {
			let alert = this.alertCtrl.create({
				subTitle: "Você não está logado!",
				buttons: ['OK']
			});

			loading.dismiss();

			alert.present();
			return;
		}

		let rating: Rating = new Rating(rate, this.learningMaterial, this.userId);

		this._ratingServices.rate(rating)
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

				loading.dismiss();

				let toast = this.toastCtrl.create({
					message: 'Material avaliado!',
					duration: 3000,
					position: 'top'
				});

				toast.present();
			}, (error: Error) => {
				loading.dismiss();
				console.log("Error: " + error.message);
			});
	}
}
