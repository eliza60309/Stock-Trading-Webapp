import { Injectable } from '@angular/core';
import { empty, Subject } from 'rxjs';

@Injectable()
export class UrlService {
  static url: string = "home";
  static empty: boolean = false;
  private static tunnel = new Subject<string>();
  listener$ = UrlService.tunnel.asObservable();

  constructor() { }
  

  updateUrl(url: string) {
    console.log("URL:" + url);
    if(url == "") {
      url = "home";
      UrlService.empty = true;
    }
    else
      UrlService.empty = false;
    UrlService.url = url;
    //if(url != "home")
    //if(!UrlService.empty)
      UrlService.tunnel.next(url);
  }
}
