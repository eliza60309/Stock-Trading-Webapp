import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { UrlService } from '../../url.service';
import * as Highcharts from "highcharts/highstock";
import IndicatorsCore from 'highcharts/indicators/indicators';
import IndicatorVbp from 'highcharts/indicators/volume-by-price';
import { ProfileService } from '../../profile.service';

IndicatorsCore(Highcharts);
IndicatorVbp(Highcharts);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = { };

  update: boolean = false;
  constructor(private mainService: MainService, private urlService: UrlService, private profileService: ProfileService) {
    this.urlService.listener$.subscribe((url: string) => {
      this.updateChart();
    });
  }

  ngOnInit(): void { }

  updateChart(): void {
    this.update = false;
    this.mainService.get(
      "candle",
      [{key: "STOCK_ID", value: UrlService.url},
      {key: "RESOLUTION", value: "D"},
      {key: "FROM", value: String(Math.round(new Date().getTime() / 1000) - 60 * 60 * 24 * 370 * 2)},
      {key: "TO", value: String(Math.round(new Date().getTime() / 1000))}]
    )
    .subscribe(data => {
      if(data.body && Object.keys(data.body).length != 0 && data.body.s == 'ok') { 
        this.setChartData(data.body);
      }
    });
  }

  setChartData(data: any) {
    let dataLength = data.o.length;
    let ohlc = [];
    let volume = [];
    for (let i = 0; i < dataLength; i++) {
      ohlc.push([data.t[i] * 1000, data.o[i], data.h[i], data.l[i], data.c[i]]);
      volume.push([data.t[i] * 1000, data.v[i]]);
    }
    this.setChartOption(UrlService.url, ohlc, volume);
    setTimeout(() => { this.chartOptions = this.chartOptions }, 1000);
  }

  setChartOption(stock_id :string, ohlc: Array<any>, volume: Array<any>): void {
    this.chartOptions = {
      rangeSelector:{ selected: 2 },
      title: { text: stock_id + ' Historical' },
      subtitle: { text: 'With SMA and Volume by Price technical indicators' },
      yAxis: [{
        labels: { align: 'right', x: -3 },
        title: { text: 'OHLC' },
        height: '60%',
        lineWidth: 2,
        resize: { enabled: true }
      }, {
        labels: { align: 'right',  x: -3 },
        title: { text: 'Volume' },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2
      }],
      tooltip: { split: true },
      series: [{
        type: 'candlestick',
        name: stock_id,
        id: 'candle',
        zIndex: 2,
        data: ohlc
      }, {
        type: 'column',
        name: 'Volume',
        id: 'volume',
        data: volume,
        yAxis: 1
      }, {
        type: 'vbp',
        linkedTo: 'candle',
        params: {
          volumeSeriesID: 'volume'
        },
        dataLabels: {
          enabled: false
        },
        zoneLines: {
          enabled: false
        }
      }, {
          type: 'sma',
          linkedTo: 'candle',
          zIndex: 1,
          marker: {
              enabled: false
          }
      }]
    };
    this.update = true;
    this.profileService.chartsUpdate(true);
  }
}
