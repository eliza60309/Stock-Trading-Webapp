import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRouterModule } from './app-router/app-router.module';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { AutoCompleteComponent } from './services/auto-complete/auto-complete.component';
import { AutoCompleteService } from './services/auto-complete/auto-complete.service';



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
    AutoCompleteComponent
  ],
  imports: [
    HttpClientModule,
    AppRouterModule,
    BrowserModule,
    NgbModule
  ],
  providers: [
    AutoCompleteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
