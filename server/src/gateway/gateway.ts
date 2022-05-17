import {Get, Injectable} from '@nestjs/common';
import { TradingService } from '../trading/trading.service'

@Injectable()
export class GateWay {
  constructor(private readonly service:TradingService){}
  @Get()
  async getData() {
    return await this.service.getDataOrder()
  }
}