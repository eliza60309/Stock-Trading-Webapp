import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MainService } from '../services/main.service';
import { ProfileService } from '../services/profile.service';
import { UrlService } from '../services/url.service';
//import { startWith, Observable, map, filter, distinctUntilChanged, debounceTime, tap, switchMap, finalize } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  text: string = ""; 
  control = new FormControl('');

  @Output() cancelEvent: EventEmitter<null> = new EventEmitter();
  //@Output() displayEvent: EventEmitter<null> = new EventEmitter();

  TIMEOUTLIMIT: number = 500;//ms
  list: Array<any> = [];
  //observeList: Observable<any[]> = [];
  isLoading: boolean = false;
  nowIndex: number = 0;
  timeout: any = 0;
  constructor(public urlService: UrlService, public profileService: ProfileService, private router: Router, private mainService: MainService) { }

  ngOnInit(): void { 
    
  }

  onKeydown(event: any) {
    if(event.key == "Enter") {
      /*if(this.text == '')
        this.profileService.noInput();*/
      this.urlService.updateUrl(this.text);
      this.router.navigate([this.text == ''? '/search/home': ('/search/' + this.text)]);
      this.profileService.clearAutoComplete(true);
    }
  }

  onClickSearch() {
      /*if(this.text == '')
        this.profileService.noInput();*/
      this.urlService.updateUrl(this.text);
      this.router.navigate([this.text == ''? '/search/home': ('/search/' + this.text)]);
      this.profileService.clearAutoComplete(true);
  }

  setUrlHome() {
    UrlService.url = 'home';
  }

  emitCancelEvent() {
    this.cancelEvent.emit();
  }
/*



  reset() {
    this.list = [];
    this.isLoading = false;
  }

  clearTime() {
    clearTimeout(this.timeout);
  }

  timedGet(stock_id: string) {
    if(stock_id == "") {
      this.reset();
      return;
    }
    this.clearTime();
    this.timeout = setTimeout(() => {
      let index = ++this.nowIndex;
      this.mainService.get(
        "auto",
        [{key: "STOCK_ID", value: stock_id}]
      )
      .subscribe(data => {
        let tmplist = [];
        if(data.body.result) {
          for(let i of data.body.result) {
            if(i.symbol && !i.symbol.includes(".") && i.symbol != "" && i.type == "Common Stock") {
              tmplist.push(i);
              console.log(i.symbol);
            }
          }
          if(this.nowIndex <= index) {
            this.nowIndex = index;
            this.isLoading = false;
            this.list = tmplist;
          }
        }
      });
    }, this.TIMEOUTLIMIT);
    this.isLoading = true;
  }*/
  /*emitDisplayEvent() {
    this.displayEvent.emit();
  }*/
}
