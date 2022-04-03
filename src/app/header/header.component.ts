import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../services/routing.service';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isMenuCollapsed = true;
  public activated: number = 0;
  public activeId: number = 1;
  constructor(public urlService: UrlService, private routingService: RoutingService) {
    this.routingService.listener$.subscribe((tab: number) => {
      this.activate(tab);
      this.activeId = tab;
    });
    this.urlService.listener$.subscribe((url: string) => {
      this.activate(this.activeId);
    });
    this.urlService.homeMsgHook.subscribe((url: string) => {
      this.activate(this.activeId);
    });
  }

  ngOnInit(): void { }

  getUrl() {
    return UrlService.url;
  }

  activate(num: number) {
    if(num == 1 && UrlService.url == "home")
      this.activated = 0;
    else
      this.activated = num;
    this.isMenuCollapsed = true;
  }
}
