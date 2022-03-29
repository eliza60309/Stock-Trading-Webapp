import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class RoutingService {
  private static tunnel = new Subject<number>();
  listener$ = RoutingService.tunnel.asObservable();

  constructor() { }

  page(num :number) {
    RoutingService.tunnel.next(num);
  }
}
