import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UrlService {
  static url: string = "home";
  private static tunnel = new Subject<string>();
  listener$ = UrlService.tunnel.asObservable();

  constructor() { }
  

  updateUrl(url: string) {
    UrlService.url = url;
    UrlService.tunnel.next(url);
  }
}
