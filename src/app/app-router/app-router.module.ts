import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PortfolioComponent } from '../components/portfolio/portfolio.component'; 
import { ProfileComponent } from '../components/profile/profile.component';
import { WatchlistComponent } from '../components/watchlist/watchlist.component';
import { DummyComponent } from '../components/dummy/dummy.component';

const routes: Routes = [
  { path: '', redirectTo: 'search/home', pathMatch: 'full'},
  { path: 'search/:stock_id', component: DummyComponent},
  { path: 'search', component: DummyComponent},
  { path: 'watchlist', component: DummyComponent},
  { path: 'portfolio', component: DummyComponent}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule]
})
export class AppRouterModule { }
