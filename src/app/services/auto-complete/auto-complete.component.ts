import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../main.service';
import { ProfileService } from '../profile.service';
import { UrlService } from '../url.service';
//import { FormControl } from '@angular/forms';
//import { MatAutocomplete } from '@angular/material/autocomplete';
//import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {

  
  TIMEOUTLIMIT: number = 1000;//ms
  list: Array<any> = [];
  isLoading: boolean = false;
  nowIndex: number = 0;
  timeout: any = 0;
  lock: boolean = true;
  //@ViewChild('auto') auto!: MatAutocomplete;

  constructor(private mainService: MainService, public urlService: UrlService, private profileService: ProfileService) { 
    this.profileService.hook.subscribe((bool: boolean) => {
      this.nowIndex += 10;
      this.clearTime();
      this.reset();
    });
  }
  
  ngOnInit(): void { }

  reset() {
    this.list = [];
    this.isLoading = false;
    this.lock = true;
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
    this.lock = false;
    this.timeout = setTimeout(() => {
      let index = ++this.nowIndex;
      this.mainService.get(
        "auto",
        [{key: "STOCK_ID", value: stock_id}]
      )
      .subscribe(data => {
        let tmplist = [];
        //console.log(data);
        if(data.body.result) {
          for(let i of data.body.result) {
            if(i.symbol && !i.symbol.includes(".") && i.symbol != "" && i.type == "Common Stock") {
              tmplist.push(i);
            }
          }
          //if(this.nowIndex <= index) {
          //  this.nowIndex = index;
          if(this.nowIndex == index) {
            if(!this.lock)
              this.list = tmplist; 
            this.isLoading = false;
          }
        }
      });
    }, this.TIMEOUTLIMIT);
    this.isLoading = true;
  }
/*
  get(stock_id :string) {
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
          }
          console.log(stock_id);
        }
        if(this.nowIndex <= index) {
          this.nowIndex = index;
          this.isLoading = false;
          this.list = tmplist;
        }
      }
    });
  }*/
}
