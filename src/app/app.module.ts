import { RatingServicesProvider } from './../providers/rating-services/rating-services';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { Camera } from '@ionic-native/camera';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { VideoPlayerPage } from './../pages/video-player/video-player';
import { SettingsPage } from './../pages/settings/settings';
import { MyAccountPage } from './../pages/my-account/my-account';
import { MeasuringKnowledgePage } from './../pages/measuring-knowledge/measuring-knowledge';
import { CreateAccountPage } from './../pages/create-account/create-account';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ModalLoginComponent } from '../components/modal-login/modal-login';
import { UserServicesProvider } from '../providers/user-services/user-services';
import { ApiServicesProvider } from '../providers/api-services/api-services';
import { HttpClientModule } from '@angular/common/http';
import { RecommenderServicesProvider } from '../providers/recommender-services/recommender-services';

@NgModule({
	declarations: [
		MyApp,
		CreateAccountPage,
		HomePage,
		MeasuringKnowledgePage,
		MyAccountPage,
		SettingsPage,
		ModalLoginComponent,
		VideoPlayerPage,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot()
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		CreateAccountPage,
		HomePage,
		MeasuringKnowledgePage,
		MyAccountPage,
		SettingsPage,
		ModalLoginComponent,
		VideoPlayerPage,
	],
	providers: [
		StatusBar,
		SplashScreen,
		YoutubeVideoPlayer,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		ApiServicesProvider,
		UserServicesProvider,
		RecommenderServicesProvider,
		RatingServicesProvider,
		Camera,
		Storage,
		SpinnerDialog,
	]
})
export class AppModule { }
