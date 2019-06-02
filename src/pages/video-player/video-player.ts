import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@IonicPage()
@Component({
	selector: 'page-video-player',
	templateUrl: 'video-player.html',
})
export class VideoPlayerPage {
	videoUrl: SafeResourceUrl;

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private youtube: YoutubeVideoPlayer, private platform: Platform,
		private domSanitizer: DomSanitizer) {
	}

	ionViewDidLoad() {
		let learningMaterial = this.navParams.get("learningMaterial");
		if (this.platform.is('cordova')) {
			this.youtube.openVideo(this.navParams.get(learningMaterial.videoId));
		} else {
			this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + learningMaterial.videoId);
		}
	}
}
