import { Component, Input, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {
  list: Array<any> = [];
  isLoading: boolean = false;
  nowIndex: number = 0;

  constructor(private mainService: MainService, public urlService: UrlService) { }
  
  ngOnInit(): void { }
  
  get(stock_id :string) {
    if(stock_id == "") {
      this.list = [];
      return;
    }
    let index = ++this.nowIndex;
    this.isLoading = true;
    this.mainService.get(
      "auto",
      [{key: "STOCK_ID", value: stock_id}]
    )
    .subscribe(data => {
      let tmplist = [];
      if(data.body.result) {
        for(let i of data.body.result) {
          if(i.symbol && !i.symbol.includes(".") && i.symbol != "")
            tmplist.push(i);
        }
        if(this.nowIndex <= index) {
          this.nowIndex = index;
          this.isLoading = false;
          this.list = tmplist;
        }
      }
    });
  }
}
