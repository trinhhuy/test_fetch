import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradingListComponent } from './components/trading-list/trading-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'tradingList', pathMatch: 'full' },
  { path: 'tradingList', component: TradingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
