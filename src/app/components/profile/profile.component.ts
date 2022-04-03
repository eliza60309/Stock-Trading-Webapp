import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { UrlService } from '../../services/url.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  stock_id: string = "";
  /*loadingDisplayed: boolean = false;
  errorDisplayed: boolean = false;
  profileWorking: boolean = false;
  profileDisplayed: boolean = false;*/
  colorGreen: boolean = true;
  display: boolean = false;
  loading: boolean = false;
  error: boolean = false;
  noInput: boolean = false;
  constructor(private urlService: UrlService, public profileService: ProfileService) {
    this.urlService.listener$.subscribe((url: string) => {
      //this.startWorking(url);
      this.reset();
      this.profileService.request();
      this.loading = true;
    });

    this.profileService.listener$.subscribe((msg: string) => {
      //this.startWorking(url);
      if(msg == "success") {
        this.success();
      }
      else if(msg == "failed") {
        this.failed();
      }
    });

    /*this.profileService.noInputHook.subscribe((bool: boolean) => {
      console.log('no data');
      setTimeout(() => this.noInput = true, 300);
    });*/
   }

  ngOnInit(): void { }

  success() {
    this.display = true;
    this.loading = false;
  }

  failed() {
    this.error = true;
    this.loading = false;
    this.noInput = UrlService.empty;
    //this.noInput = false;
  }

  reset() {
    this.display = false;
    this.error = false;
    this.loading = false;
    //this.noInput = false;
  }

  resetURL() {
    this.reset();
  }

  /*
  startWorking(url: string) {
    if(url != "" && url != "home") {
      this.stock_id = url;
      if(this.profileWorking) {
        this.cancelDisplay();
        setTimeout(() => {this.profileWorking = true}, 300);
      }
      else
        this.profileWorking = true;
      this.loadingDisplayed = true;
    }
  }

  receiveColor(color: boolean) {
    this.colorGreen = color;
  }

  receiveComplete() {
    this.loadingDisplayed = false;
    this.profileDisplayed = true;
  }

  receiveNoData() {
    //this.profileWorking = false;
    this.profileDisplayed = false;
    this.loadingDisplayed = false;
    this.errorDisplayed = true;
  }

  cancelDisplay() {
    this.profileDisplayed = false;
   // this.profileWorking = false;
    this.loadingDisplayed = false;
    this.errorDisplayed = false;
  }
  */
}
