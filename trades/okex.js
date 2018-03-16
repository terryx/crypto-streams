const { Observable } = require('rxjs')
const numeral = require('numeral')
const { w3cwebsocket } = require('websocket')
const helper = require('../utils/helper')

const next = (socket, currency) => {
  return socket.next(JSON.stringify({
    event: 'addChannel',
    channel: `ok_sub_spot_${currency}_usdt_trade`
  }))
}

const stream = (currency) => {
  const websocket = Observable.webSocket({
    url: `wss://real.okex.com:10441/websocket`,
    WebSocketCtor: w3cwebsocket
  })

  next(websocket, currency)

  return websocket
    .mergeMap(res => Observable.from(res))
    .map(res => res.data)
    .filter(data => Array.isArray(data))
    .mergeMap(data => Observable.from(data))
    .scan((acc, cur) => {
      const total = helper.getTotal(cur[1], cur[2])
      if (cur[4] === 'bid') {
        acc.add(total)
      } else {
        acc.subtract(total)
      }

      return acc
    }, numeral(0))
    .map(total => total.value())
    .catch(() => {
      websocket.complete()
      return Observable.empty()
    })
}

module.exports = { stream }
