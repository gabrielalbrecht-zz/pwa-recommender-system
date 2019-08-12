import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiServicesProvider {
	
	private _url: string = "https://how2code.eastus.cloudapp.azure.com/";
	//private _url: string = "https://fast-ridge-96629.herokuapp.com/";
	//private _url: string = "http://localhost:8080/";

	get url() {
		return this._url;
	}

	httpOptions(authorization) {
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization' : authorization
			})
		};

		return httpOptions;
	}
}
