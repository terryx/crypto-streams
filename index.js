const { Observable, Subject } = require('rxjs')
const bitfinex = require('./trades/bitfinex')
const gdax = require('./trades/gdax')
const gemini = require('./trades/gemini')
const binance = require('./trades/binance')
const okex = require('./trades/okex')

module.exports = {
  usd: currency => {
    return Observable
      .merge(
        bitfinex.stream(currency),
        gdax.stream(currency),
        gemini.stream(currency)
      )
      .multicast(new Subject())
  },
  usdt: currency => {
    return Observable
      .merge(
        binance.stream(currency),
        okex.stream(currency)
      )
      .multicast(new Subject())
  }
}
