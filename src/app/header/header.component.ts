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
  }

  ngOnInit(): void { }

  getClass(num: number) {
    if(num == this.activated)
      return "active";
    else
      return "";
  }

  getUrl() {
    return UrlService.url;
  }

  activate(num: number) {
    this.activated = num;
    this.isMenuCollapsed = true;
  }
}
