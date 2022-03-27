import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ProfileService {

  private static tunnel = new Subject<string>();
  listener$ = ProfileService.tunnel.asObservable();

  private static colormsg = new Subject<boolean>();
  listener2 = ProfileService.colormsg.asObservable();

  static loading: boolean = false;
  static showProfile: boolean = false;
  static showError: boolean = false;

  static bannerReady: boolean = false;
  static summaryReady: boolean = false;
  static newsReady: boolean = false;
  static chartsReady: boolean = false;
  static insightReady: boolean = false;
  static ticker: boolean = true;
  constructor() { }


  
  reset() {
    ProfileService.loading = false;
    ProfileService.showProfile = false;
    ProfileService.showError = false;
    ProfileService.bannerReady = false;
    ProfileService.summaryReady = false;
    ProfileService.newsReady = false;
    ProfileService.chartsReady = false;
    ProfileService.insightReady = false;
    ProfileService.ticker = true;
  }

  setTicker(bool: boolean) {
    ProfileService.ticker = bool;
    ProfileService.colormsg.next(bool);
  }

  request() {
    this.reset();
    ProfileService.loading = true;
  }

  bannerUpdate(ok: boolean) {
    if(ok) {
      ProfileService.bannerReady = true;
      console.log("banner ok received");
      this.checkDone();
    }
    else {
      this.failed();
    }
  }

  summaryUpdate(ok: boolean) {
    if(ok) {
      ProfileService.summaryReady = true;
      console.log("summary ok received");
      this.checkDone();
    }
    else {
      this.failed();
    }
  }

  newsUpdate(ok: boolean) {
    if(ok) {
      ProfileService.newsReady = true;
      console.log("news ok received");
      this.checkDone();
    }
    else {
      this.failed();
    }
  }

  chartsUpdate(ok: boolean) {
    if(ok) {
      ProfileService.chartsReady = true;
      console.log("charts ok received");
      this.checkDone();
    }
    else {
      this.failed();
    }
  }

  insightUpdate(ok: boolean) {
    if(ok) {
      ProfileService.insightReady = true;
      console.log("insight ok received");
      this.checkDone();
    }
    else {
      this.failed();
    }
  }

  checkDone() {
    if(ProfileService.bannerReady &&
      //ProfileService.summaryReady &&
      ProfileService.chartsReady// &&
      //ProfileService.newsReady &&
      //ProfileService.insightReady
      ) {
      ProfileService.showProfile = true;
      this.updateProfile("success");
    }
  }

  failed() {
    ProfileService.showError = true;
    this.updateProfile("failed");
  }

  updateProfile(msg: string) {
    ProfileService.tunnel.next(msg);
  }
}
