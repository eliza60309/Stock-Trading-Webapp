import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class WatchlistService {
  static watchlist: Array<string> = [];
  private static tunnel = new Subject<string>();
  constructor() {
    if(localStorage.getItem('watchlist'))
      WatchlistService.watchlist = JSON.parse(localStorage.getItem('watchlist')!);
    this.updateWatchlist("construct", "");
  }
  listener = WatchlistService.tunnel.asObservable();

  add(target: string) {
    WatchlistService.watchlist.push(target);
    this.updateWatchlist("add", target);
  }

  check(target: string): boolean {
    return WatchlistService.watchlist.findIndex((value) => value == target) != null;
  }

  remove(target: string) {
    WatchlistService.watchlist = WatchlistService.watchlist.filter((value) => value != target);
    this.updateWatchlist("remove", target);
  }

  updateWatchlist(method: string, target: string) {
    localStorage.setItem('watchlist', JSON.stringify(WatchlistService.watchlist));
    WatchlistService.tunnel.next(method + "<partitionerYAYA>" + target);
  }

}
