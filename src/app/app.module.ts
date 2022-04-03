import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRouterModule } from './app-router/app-router.module';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { AutoCompleteComponent } from './services/auto-complete/auto-complete.component';
import { BannerComponent } from './services/banner/banner.component';
import { TabsComponent } from './services/tabs/tabs.component';
import { SummaryComponent } from './services/tabs/summary/summary.component';
import { TopNewsComponent } from './services/tabs/top-news/top-news.component';
import { ChartsComponent } from './services/tabs/charts/charts.component';
import { InsightComponent } from './services/tabs/insight/insight.component';
import { HighchartsChartComponent } from 'highcharts-angular';
import { ChartModule } from 'angular-highcharts';
import { MainService } from './services/main.service';
import { UrlService } from './services/url.service';
import { WatchlistService } from './services/watchlist.service';
import { ProfileService } from './services/profile.service';
import { PortfolioService } from './services/portfolio.service';
import { TradeService } from './services/trade.service';
import { BuyWindowComponent } from './services/modals/buy-window/buy-window.component';
import { SellWindowComponent } from './services/modals/sell-window/sell-window.component';
import { RoutingService } from './services/routing.service';


@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    ProfileComponent,
    WatchlistComponent,
    PortfolioComponent,
    DummyComponent,
    AutoCompleteComponent,
    BannerComponent,
    TabsComponent,
    SummaryComponent,
    TopNewsComponent,
    ChartsComponent,
    InsightComponent,
    BuyWindowComponent,
    SellWindowComponent,
  ],
  imports: [
    HighchartsChartModule,
    ChartModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    AppRouterModule,
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatTabsModule
  ],
  providers: [
    MainService,
    UrlService,
    WatchlistService,
    ProfileService,
    PortfolioService,
    TradeService,
    RoutingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
