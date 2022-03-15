import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class AutoCompleteService {
  constructor(private http: HttpClient) { }
  url = "https://hw789etc-343408.wl.r.appspot.com/api/auto";
  get(stock_id: string) {
    let param = new HttpParams();
    param = param.set("STOCK_ID", stock_id);
    return this.http.get<any>(this.url, {params: param, observe: 'response'});
  }

}