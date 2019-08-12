import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServicesProvider } from '../api-services/api-services';

@Injectable()
export class RecommenderServicesProvider {
	private _url: String;

	constructor(
		public http: HttpClient,
		private _api: ApiServicesProvider,
	) {
		this._url = this._api.url;
	}

	getLearningMaterials(query: String) {
		let api = this._url + 'recommender/' + query;

		let httpOptions = this.mountHttpOptions("a", 0);

		return this.http.get(api, httpOptions);
	}

	mountHttpOptions(userId :String = "0", sessionId = 0) {
		let params = sessionId;
		
		let httpOptions = this._api.httpOptions(params);

		return httpOptions;
	}
}
