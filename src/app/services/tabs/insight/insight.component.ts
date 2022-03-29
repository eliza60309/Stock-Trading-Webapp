import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { Options } from "highcharts/highstock";


import IndicatorsCore from "highcharts/indicators/indicators";
import { MainService } from '../../main.service';
import { UrlService } from '../../url.service';
IndicatorsCore(Highcharts);

@Component({
  selector: 'app-insight',
  templateUrl: './insight.component.html',
  styleUrls: ['./insight.component.css']
})
export class InsightComponent implements OnInit {
  update1: boolean = false;
  Highcharts1: typeof Highcharts = Highcharts;
  chartOptions1: Options = { };
  update2: boolean = false;
  Highcharts2: typeof Highcharts = Highcharts;
  chartOptions2: Options = { };
  twitter_total: number = 0;
  twitter_pos: number = 0;
  twitter_neg: number = 0;
  reddit_total: number = 0;
  reddit_pos: number = 0;
  reddit_neg: number = 0;
  FUCKING_COMPANY_NAME: string = "";
  constructor(private mainService: MainService, private urlService: UrlService) {
    this.urlService.listener$.subscribe((url: string) => {
      this.getTrend();
      this.getRecommendation();
      this.getEarnings();
      this.getQuery();
    });
  }

  ngOnInit() { }

  getTrend() {
    this.mainService.get(
      "social",
      [{key: "STOCK_ID", value: UrlService.url}]
    )
    .subscribe(data => {
      if(data.body && data.body.reddit && data.body.twitter) {
        this.digestTrend(data.body.reddit, data.body.twitter);
      }
    });
  }

  getRecommendation() {
    this.mainService.get(
      "recommendation",
      [{key: "STOCK_ID", value: UrlService.url}]
    )
    .subscribe(data => {
      if(data.body && data.body.length > 0) {
        this.digestRecommendation(data.body);
      }
    });
  }

  getEarnings() {
    this.mainService.get(
      "earnings",
      [{key: "STOCK_ID", value: UrlService.url}]
    )
    .subscribe(data => {
      if(data.body && data.body.length > 0) {
        this.digestEarnings(data.body);
      }
    });
  }

  getQuery() {
    this.mainService.get(
      "query",
      [{key: "STOCK_ID", value: UrlService.url}]
    )
    .subscribe(data => {
      if(data.body && Object.keys(data.body).length != 0) {
        this.FUCKING_COMPANY_NAME = data.body.name;
      }
    });
  }

  digestTrend(reddit: Array<any>, twitter: Array<any>) {
    for(let i = 0; i < reddit.length; i++) {
      this.reddit_total += reddit[i].mention;
      this.reddit_pos += reddit[i].positiveMention;
      this.reddit_neg += reddit[i].negativeMention;
    }
    for(let i = 0; i < twitter.length; i++) {
      this.twitter_total += twitter[i].mention;
      this.twitter_pos += twitter[i].positiveMention;
      this.twitter_neg += twitter[i].negativeMention;
    }
  }

  digestRecommendation(data: Array<any>) {
    let hold: Array<number> = [];
    let buy: Array<number> = [];
    let sell: Array<number> = [];
    let sbuy: Array<number> = [];
    let ssell: Array<number> = [];
    let time = [];
    for(let i = 0; i < data.length; i++) {
      hold.push(data[i].hold);
      buy.push(data[i].buy);
      sell.push(data[i].sell);
      sbuy.push(data[i].strongBuy);
      ssell.push(data[i].strongSell);
      time.push(data[i].period);
    }
    this.chartOptions1 = {
      chart: { type: 'column', spacingBottom: 50 },
      title: { text: 'Recommendation Trends' },
      xAxis: { categories: time },
      yAxis: { min: 0, title: { text: '#Analysis', align: 'high'} },
      legend: {
          align: 'center',
          verticalAlign: 'bottom',
          y: 40,
          floating: true,
          backgroundColor: 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
      },
      tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}'
      },
      plotOptions: { column: { stacking: 'normal', dataLabels: { enabled: true } }
      },
      series: [{
        name: 'Strong Buy',
        type: 'column',
        data: sbuy,
        color: "rgb(24, 99, 47)"
      }, {
        name: 'Buy',
        type: 'column',
        data: buy,
        color: "rgb(23, 165, 68)"
      }, {
        name: 'Hold',
        type: 'column',
        data: hold,
        color: "rgb(155, 113, 22)"
      }, { 
        name: 'Sell',
        type: 'column',
        data: sell,
        color: "rgb(199, 66, 66)"
      }, { 
        name: 'Strong Sell',
        type: 'column',
        data: ssell,
        color: "rgb(93, 34, 34)"
      }]
    };
    this.update1 = true;
  }

  digestEarnings(data: Array<any>) {
    let line1: Array<any> = [];
    let line2: Array<any> = [];
    let cat: Array<any> = [];
    for(let i = 0; i < data.length; i++) {
      let surprise = (data[i].surprise == null? 0: data[i].surprise);
      let actual = (data[i].actual == null? 0: data[i].actual);
      let estimate = (data[i].estimate == null? 0: data[i].estimate);
      line1.push([i, actual]);
      line2.push([i, estimate]);
      cat.push(data[i].period + '<br>Surprise: ' + surprise);
    }
    this.chartOptions2 = {
      chart: { type: 'spline' },
      title: { text: 'Historical EPS Surprises' },
      xAxis: { categories: cat },
      yAxis: { title: { text: 'Quarterly EPS' } },
      legend: { enabled: false },
      tooltip: { headerFormat: '{point.key}<br>', shared: true, },
      series: [{
        name: 'Actual',
        type: 'spline',
        data: line1
      }, {
        name: 'Estimate',
        type: 'spline',
        data: line2
      }]
    };
    this.update2 = true;
  }
}
