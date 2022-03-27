import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UrlService {
  static url: string = "home";
  private static tunnel = new Subject<string>();
  listener$ = UrlService.tunnel.asObservable();

  constructor() { }
  

  updateUrl(url: string) {
    console.log("URL:" + url);
    UrlService.url = url;
    if(url != "home")
      UrlService.tunnel.next(url);
  }
}
