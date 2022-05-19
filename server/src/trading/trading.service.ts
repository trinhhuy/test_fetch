import { Injectable } from '@nestjs/common';
const axios = require('axios')
@Injectable()
export class TradingService {
  async getData(): Promise<{ high: Number, low: Number }> {
    try {
      let response = await axios.get('https://api.binance.com/api/v3/klines?symbol=ETHBTC&interval=1m&&limit=1')
      if (response.data) {
        let item = response.data[0]
        return { high: Number(item[2]), low: Number(item[3]) }
      }
      return null
    } catch (e) {
      console.log('TradingService@getData: ' + e.message)
      return null
    }
  }

  async getDataOrder(): Promise<{ buy: Array<Object>, sell: Array<Object> }> {
    let data = await this.getData();
    let result = {
      buy: [],
      sell: []
    }
    if (data) {
      result = this.generateRandomOrder(data)
    }
    if (result.buy.length) {
      result.buy = result.buy.sort((a, b) => {
        return Number(b.price) - Number(a.price)
      })
    }
    if (result.sell.length) {
      result.sell = result.sell.sort((a, b) => {
        return Number(b.price) - Number(a.price)
      })
    }
    return result
  }

  generateRandomOrder(data): {buy: Array<Object>, sell: Array<Object>} {
    let numberFake = Math.pow(10, 8)

    let listBuy = this.getDataBuy(numberFake, data)
    let listSell = this.getDataSell(numberFake, data)

    return {
      buy: listBuy,
      sell: listSell
    }
  }

  getDataBuy(numberFake, data){
    let high = Number(data.high)
    let low = Number(data.low)

    let listBuy = []
    let totalBuyGenerated = 0
    let isBuy = true
    let price = 0
    let size = 0
    let maxBuy = 5
    while (isBuy) {
      let totalLowHeight = low + high
      price = (listBuy.length === 0) ? low : this.getRandomNumberBetween(low, (totalLowHeight) / 2)
      size = this.getRandomNumberBetween(0, (maxBuy / 10) / high)
      if (!size) {
        continue
      }
      totalBuyGenerated += (Number(price) * numberFake * size)
      if (totalBuyGenerated > (maxBuy * numberFake)) {
        isBuy = false
      } else {
        listBuy.push({
          price: price,
          size: size
        })
      }
    }
    return listBuy
  }

  getDataSell(numberFake, data) {
    let high = Number(data.high)
    let low = Number(data.low)

    let sizeSell = 150
    let isSell = true
    let totalSizeSold = 0
    let price = 0
    let size = 0
    let listSell = []
    while (isSell) {
      price = (listSell.length === 0) ? high : this.getRandomNumberBetween((low + high) / 2, high)
      size = this.getRandomNumberBetween(0, sizeSell / 10)
      if (!size) {
        continue
      }
      totalSizeSold += size * numberFake
      if (totalSizeSold > (sizeSell * numberFake)) {
        isSell = false
      } else {
        listSell.push({
          price: price,
          size: size
        })
      }
    }
    return listSell
  }

  getRandomNumberBetween(min, max) {
    return (Math.random() * (max - min) + min).toFixed(8)
  }
}
