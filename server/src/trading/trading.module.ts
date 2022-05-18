import { Global, Module } from '@nestjs/common';
import { TradingController } from './trading.controller';
import { TradingService } from './trading.service';

@Global()
@Module({
  controllers: [TradingController],
  providers: [TradingService],
  exports: [TradingService]
})
export class TradingModule {}
