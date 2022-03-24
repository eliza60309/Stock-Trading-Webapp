import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { WatchlistService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  watchlist: Array<string> = [];
  constructor(private mainService: MainService, private watchlistService: WatchlistService) {
      this.watchlist = WatchlistService.watchlist;
      this.watchlistService.listener.subscribe((url: string) => {
      this.watchlist = WatchlistService.watchlist;
    });
  }
  ngOnInit(): void {
  }

}
