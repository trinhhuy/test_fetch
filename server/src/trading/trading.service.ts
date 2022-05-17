import { Injectable } from '@nestjs/common';
const axios = require('axios')

@Injectable()
export class TradingService {
  async getData() {
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

  async getDataOrder() {
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

  generateRandomOrder(data) {
    let numberFake = Math.pow(10, 8)
    let high = Number(data.high)
    let low = Number(data.low)
    let maxBuy = 5
    let sizeSell = 150
    let isBuy = true
    let isSell = true
    let totalBuyGenerated = 0
    let totalSizeSold = 0
    let price = 0
    let size = 0
    let listBuy = []
    let listSell = []

    while (isBuy) {
      price = (listBuy.length === 0) ? low : this.getRandomNumberBetween(low, (low + high) / 2)
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

    return {
      buy: listBuy,
      sell: listSell
    }
  }

  getRandomNumberBetween(min, max) {
    return (Math.random() * (max - min) + min).toFixed(8)
  }
}
