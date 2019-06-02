import { MyApp } from './../../app/app.component';
import { VideoPlayerPage } from './../video-player/video-player';
import { LearningMaterial } from './../../models/learningMaterial';
import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, App, Events } from 'ionic-angular';
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

	public learningMaterials: LearningMaterial[] = null;

	constructor(public navCtrl: NavController,
		public modalCtrl: ModalController,
		public navParams: NavParams,
		private storage: Storage,
		public recommenderServices: RecommenderServicesProvider) {

	}

	ionViewDidEnter() {
		this.storage.get('loggedIn').then((val) => {
			this.loggedIn = val;
		});
	}

	showModalLogin() {
		let modalLogin = this.modalCtrl.create(ModalLoginComponent);
		modalLogin.present();
	}

	logout() {
		this.storage.set("loggedIn", false);
		this.navCtrl.setRoot(MyApp);
	}

	search() {
		this.recommenderServices.getLearningMaterials(this.query)
			.subscribe((data: any) => {
				if (data.success) {
					this.learningMaterials = data.videos;
					console.log(this.learningMaterials);
				}
			});
	}

	watch(learningMaterial: LearningMaterial) {
		this.navCtrl.push(VideoPlayerPage, { learningMaterial: learningMaterial });
	}
}
