import { RatingServicesProvider } from '../providers/rating-services/rating-services';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { VideoPlayerPage } from '../pages/video-player/video-player';
import { MyAccountPage } from '../pages/my-account/my-account';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
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
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { ComponentsModule } from '../components/components.module';
import { CreateAccountPageModule } from '../pages/create-account/create-account.module';
import { MyAccountPageModule } from '../pages/my-account/my-account.module';
import { VideoPlayerPageModule } from '../pages/video-player/video-player.module';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot(),
		Ng2ImgMaxModule,
		ComponentsModule,
		CreateAccountPageModule,
		MyAccountPageModule,
		VideoPlayerPageModule,
		IonicPageModule.forChild(HomePage)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		CreateAccountPage,
		HomePage,
		MyAccountPage,
		VideoPlayerPage,
		ModalLoginComponent
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
		SpinnerDialog,
	]
})
export class AppModule { }
