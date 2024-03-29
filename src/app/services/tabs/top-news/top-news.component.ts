import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../url.service';
import { MainService } from '../../main.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-top-news',
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.css']
})
export class TopNewsComponent implements OnInit {
  list: Array<any> = [];
  stock_id: string = "";
  target: any = {source: "", time: new Date(), headline: "", summary: "", url: ""};
  constructor(private mainService: MainService, private urlService: UrlService, private modalService: NgbModal) {
    this.urlService.listener$.subscribe((url: string) => {
        
      this.stock_id = url;
      this.updateNews();
      //this.startWorking(url);
    });
  }

  ngOnInit(): void {
    //this.startWorking(UrlService.url);
  }

  encode(str: string) {
    return encodeURIComponent(str);
  }

  record(item: any, content: any) {
    this.target.source = item.source;
    this.target.time = new Date(item.datetime * 1000);
    this.target.headline = item.headline;
    this.target.summary = item.summary;
    this.target.url = item.url;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  startWorking(url: string) {
    this.stock_id = url;
    this.updateNews();
  }

  updateNews() {
    let time = this.getTime();
    this.mainService.get(
      "news",
      [{key: "STOCK_ID", value: this.stock_id},
      {key: "FROM", value: time[0]},
      {key: "TO", value: time[1]}]
    )
    .subscribe(data => {
      if(data.body && data.body.length > 0) {
        let cnt = 0;
        this.list = data.body.filter((value: any) => {
          if(cnt >= 20 || value.image == "")
            return false;
          else {
            cnt++;
            return true;
          }
        });
      }
    });
  }

  getTime() {
    var time = new Date();
    var ts_end = Math.round(time.getTime() / 1000);
    var news_start_time = new Date((ts_end - 60 * 60 * 24 * 30) * 1000);
    var news_start_string = String(news_start_time.getFullYear()) + '-';
    var news_end_string = String(time.getFullYear()) + '-';
    if(news_start_time.getMonth() + 1 < 10)
        news_start_string += '0' + String(news_start_time.getMonth() + 1) + '-';
    else                     news_start_string += String(news_start_time.getMonth() + 1) + '-';
    if(news_start_time.getDate() < 10)
        news_start_string += '0' + String(news_start_time.getDate());
    else
        news_start_string += String(news_start_time.getDate());
    if(time.getMonth() + 1 < 10)
        news_end_string += '0' + String(time.getMonth() + 1) + '-';
    else
        news_end_string += String(time.getMonth() + 1) + '-';
    if(time.getDate() < 10)
        news_end_string += '0' + String(time.getDate());
    else
        news_end_string += String(time.getDate());
    return [news_start_string, news_end_string];
  }
}
