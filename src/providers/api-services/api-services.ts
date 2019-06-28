import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiServicesProvider {

	private _url: string = "https://fast-ridge-96629.herokuapp.com/";
	//private _url: string = "http://localhost:8080/";
	private _httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	get url() {
		return this._url;
	}

	get httpOptions() {
		return this._httpOptions;
	}
}
