import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface pair {
  key: string;
  value: string;
}

@Injectable()
export class MainService {
  constructor(private http: HttpClient) { }
  url = "https://hw789etc-343408.wl.r.appspot.com/api/";
  get(suffix :string, params: Array<pair>) {
    let param = new HttpParams();
    
    for (let item of params) {
      param = param.set(item.key, item.value);
    }

    //let item = this.http.get<any>(this.url + suffix, {params: param, observe: 'response'});
    //item.subscribe(data => {console.log(data.status)});
    //return item;

    
    return this.http.get<any>(this.url + suffix, {params: param, observe: 'response'});
    
  }
}