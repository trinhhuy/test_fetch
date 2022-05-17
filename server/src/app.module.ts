import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TradingModule } from './trading/trading.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [TradingModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
