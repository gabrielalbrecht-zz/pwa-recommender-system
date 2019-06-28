import { User } from './../../models/user';
import { Login } from './../../models/login';
import { ApiServicesProvider } from './../api-services/api-services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

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
			password: Md5.hashStr(login.password)
		});
		let api = this._url + 'user/login';

		return this.http.post(api, data, this._api.httpOptions);
	}

	createUser(user: User) {
		let data = JSON.stringify({
			email: user.email,
			password: Md5.hashStr(user.password),
			fullname: user.fullname,
			ifsulStudent: user.ifsulStudent,
			image: user.image
		});
		let api = this._url + 'user/';

		return this.http.post(api, data, this._api.httpOptions);
	}

	getById(id: String) {
		let api = this._url + 'user/' + id;
		return this.http.get(api, this._api.httpOptions);
	}

	modifyById(user: User) {
		let data = JSON.stringify({
			email: user.email,
			password: (user.password ? Md5.hashStr(user.password) : null),
			fullname: user.fullname,
			ifsulStudent: user.ifsulStudent,
			image: user.image
		});
		let api = this._url + 'user/' + user.id;

		return this.http.put(api, data, this._api.httpOptions);
	}
}
