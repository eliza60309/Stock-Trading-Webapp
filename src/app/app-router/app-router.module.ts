import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
