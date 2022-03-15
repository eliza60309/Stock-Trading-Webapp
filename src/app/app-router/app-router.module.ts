import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PortfolioComponent } from '../components/portfolio/portfolio.component'; 
import { ProfileComponent } from '../components/profile/profile.component';
import { WatchlistComponent } from '../components/watchlist/watchlist.component';
import { DummyComponent } from '../components/dummy/dummy.component';

const routes: Routes = [
  { path: '/search/home', component: DummyComponent},
  { path: '/search/:stock_id', component: ProfileComponent },
  { path: '/watchlist', component: WatchlistComponent },
  { path: '/portfolio', component: PortfolioComponent}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule]
})
export class AppRouterModule { }
