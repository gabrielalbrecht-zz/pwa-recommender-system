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

	rate(rate: Rating) {
		let data = JSON.stringify({
			rating: rate.rating,
			userId: rate.userId,
			learningMaterial: rate.learningMaterial,
		});

		let api = this._url + 'rating/';

		return this.http.post(api, data, this._api.httpOptions);
	}
}
