import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServicesProvider } from '../api-services/api-services';

@Injectable()
export class RecommenderServicesProvider {
	private _url: String;

	constructor(public http: HttpClient,
		private _api: ApiServicesProvider) {

		this._url = this._api.url;
	}

	getLearningMaterials(query: String) {
		let api = this._url + 'recommender/' + query;

		return this.http.get(api, this._api.httpOptions);
	}
}
