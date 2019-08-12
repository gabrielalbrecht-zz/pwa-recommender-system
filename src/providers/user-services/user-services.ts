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

		let httpOptions = this.mountHttpOptions();

		return this.http.post(api, data, httpOptions);
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

		let httpOptions = this.mountHttpOptions();

		return this.http.post(api, data, httpOptions);
	}

	getById(sessionId) {
		let api = this._url + 'user/';

		let httpOptions = this.mountHttpOptions(sessionId);

		return this.http.get(api, httpOptions);
	}

	modifyById(user: User, sessionId) {
		let data = JSON.stringify({
			email: user.email,
			password: (user.password ? Md5.hashStr(user.password) : null),
			fullname: user.fullname,
			ifsulStudent: user.ifsulStudent,
			image: user.image
		});

		let api = this._url + 'user/';

		let httpOptions = this.mountHttpOptions(sessionId);

		return this.http.put(api, data, httpOptions);
	}

	logout(sessionId) {
		let api = this._url + 'user/logout';

		let httpOptions = this.mountHttpOptions( sessionId);

		return this.http.post(api, null, httpOptions);
	}

	autoLogin(sessionId) {
		let api = this._url + 'user/autoLogin';

		let httpOptions = this.mountHttpOptions(sessionId);

		return this.http.post(api, null, httpOptions);
	}

	mountHttpOptions(sessionId = 0) {
		let params = sessionId;
		
		let httpOptions = this._api.httpOptions(params);

		return httpOptions;
	}
}
