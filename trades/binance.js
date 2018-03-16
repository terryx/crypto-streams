const { Observable } = require('rxjs')
const numeral = require('numeral')
const w3cwebsocket = require('websocket').w3cwebsocket
const helper = require('../utils/helper')

const stream = (currency) => {
  const symbol = currency.toLowerCase() + 'usdt'
  const websocket = Observable.webSocket({
    url: `wss://stream.binance.com:9443/stream?streams=${symbol}@trade`,
    WebSocketCtor: w3cwebsocket
  })

  return websocket
    .map(res => res.data)
    .scan((acc, cur) => {
      const total = helper.getTotal(cur.q, cur.p)
      const sum = numeral(acc)
      acc = cur.m === true ? sum.add(total) : sum.subtract(total)

      return acc.value()
    }, 0)
}

module.exports = { stream }
