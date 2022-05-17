import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TradingService } from 'src/app/services/trading.service'

@Component({
  selector: 'app-trading-list',
  templateUrl: './trading-list.component.html',
  styleUrls: ['./trading-list.component.css']
})
export class TradingListComponent implements OnInit {
  dataSell: any;
  dataBuy: any;
  public _TradingSub: Subscription = new Subscription();
  constructor(private tradingService: TradingService) { }

  ngOnInit(): void {
    this.initData();
    this.initSocket();
  }
  ngOnDestroy() {
    this._TradingSub.unsubscribe();
  }
  get totalBuy() {
    let total = 0
    for (let item of this.dataBuy) {
      total += Number(item.price) * Number(item.size)
    }
    return total.toFixed(8)
  }
  get totalSell() {
    let total = 0
    for (let item of this.dataBuy) {
      total += Number(item.size)
    }
    return total.toFixed(8)
  }
  initData() {
    this.tradingService.getData()
      .subscribe(
        response => {
          let result = Object(response)
          this.dataSell = result.sell
          this.dataBuy = result.buy
        },
        error => {
          console.log(error);
        });
  }
  initSocket() {
    this._TradingSub = this.tradingService.tradingLists.subscribe(response => {
      let result = Object(response)
      this.dataSell = result.sell
      this.dataBuy = result.buy
    });
  }

}
