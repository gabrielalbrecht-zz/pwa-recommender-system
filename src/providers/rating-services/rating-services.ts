import { ApiServicesProvider } from './../api-services/api-services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating } from '../../models/rating';

@Injectable()
export class RatingServicesProvider {

	private _url: String;

	constructor(public http: HttpClient,
		private _api: ApiServicesProvider) {

		this._url = this._api.url;
	}

	rate(rate: Rating, sessionId) {
		let data = JSON.stringify({
			userId: rate.userId,
			rating: rate.rating,
			learningMaterial: rate.learningMaterial,
		});

		let api = this._url + 'rating/';

		let httpOptions = this.mountHttpOptions(sessionId);

		return this.http.post(api, data, httpOptions);
	}

	mountHttpOptions(sessionId = 0) {
		let params = sessionId;
		
		let httpOptions = this._api.httpOptions(params);

		return httpOptions;
	}
}
