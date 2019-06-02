import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ModalLoginComponent } from '../../components/modal-login/modal-login';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController) {
  }

  showModalLogin() {
    let modalLogin = this.modalCtrl.create(ModalLoginComponent);
    modalLogin.present();
  }
}
