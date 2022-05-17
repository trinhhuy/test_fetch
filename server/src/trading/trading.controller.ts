import { Controller, Get } from '@nestjs/common';
import { TradingService } from './trading.service'

@Controller('trading')
export class TradingController {
  constructor(private readonly service:TradingService){}
  @Get()
  async getData() {
    return await this.service.getDataOrder()
  }
}
