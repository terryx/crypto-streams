const { Observable, Subject } = require('rxjs')
const bitfinex = require('./trades/bitfinex')
const gdax = require('./trades/gdax')
const gemini = require('./trades/gemini')

const subject = (currency) => Observable
  .merge(
    bitfinex.stream(currency),
    gdax.stream(currency),
    gemini.stream(currency)
  )
  .multicast(new Subject())

module.exports = {
  usd: subject
}
