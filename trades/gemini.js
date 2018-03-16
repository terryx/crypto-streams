const { Observable } = require('rxjs')
const numeral = require('numeral')
const w3cwebsocket = require('websocket').w3cwebsocket
const helper = require('../utils/helper')

const stream = (currency) => {
  const symbol = currency.toUpperCase() + 'USD'
  const websocket = Observable.webSocket({
    url: `wss://api.gemini.com/v1/marketdata/${symbol}`,
    WebSocketCtor: w3cwebsocket
  })

  return websocket
    .map(res => res.events)
    .mergeMap(events => Observable.from(events))
    .filter(feed => feed.type === 'trade')
    .scan((acc, cur) => {
      const total = helper.getTotal(cur.amount, cur.price)
      if (cur.makerSide === 'bid') {
        acc.add(total)
      } else {
        acc.subtract(total)
      }

      return acc
    }, numeral(0))
    .map(total => total.value())
}

module.exports = { stream }
