import { Login } from './../../models/login';
import { ApiServicesProvider } from './../api-services/api-services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserServicesProvider {

	private _url: String;

	constructor(public http: HttpClient,
		private _api: ApiServicesProvider) {

		this._url = this._api.url;
	}

	login(login: Login) {
		let data = JSON.stringify({
			email: login.email,
			password: login.password
		});
		let api = this._url + 'user/login';

		return this.http.post(api, data, this._api.httpOptions);
	}
}
