const { Observable } = require('rxjs')
const chalk = require('chalk')
const numeral = require('numeral')
const Table = require('table')
const { argv } = require('yargs')
const format = require('../utils/format')
const config = require('../config')(argv.env)
const currency = argv.currency.toLowerCase()

const w3cwebsocket = require('websocket').w3cwebsocket

const next = (socket) => {
  return socket.next(JSON.stringify({'event': 'addChannel', 'channel': `ok_sub_futureusd_${currency}_trade_this_week`}))
}

const getTotal = (size, price) => {
  return numeral(size).multiply(numeral(price).value())
}

const stream = () => {
  const websocket = Observable.webSocket({
    url: 'wss://real.okex.com:10440/websocket/okexapi',
    WebSocketCtor: w3cwebsocket
  })

  const table = Table.createStream({
    border: Table.getBorderCharacters(`norc`),
    columnDefault: {
      width: 11
    },
    columnCount: 5,
    columns: {
      0: {
        width: 3
      }
    }
  })

  websocket
    .mergeMap(res => Observable.from(res))
    .map(res => res.data)
    .filter(res => Array.isArray(res))
    .mergeMap(data => Observable.from(data))
    .filter(data => getTotal(data[2], data[1]).value() >= config.okex[currency].amount)
    .subscribe({
      next: data => {
        // [tid, price, amount, time, side]
        const res = {
          tid: data[0],
          price: data[1],
          amount: data[2],
          time: data[3],
          side: data[4]
        }

        const rows = []
        const side = res.side.toUpperCase()
        const total = getTotal(data[2], data[1])

        if (side === 'ASK') {
          rows.push(`${chalk.green(side)}`)
        }

        if (side === 'BID') {
          rows.push(`${chalk.red(side)}`)
        }

        rows.push(`${res.amount} ${format.currency(currency)}`)
        rows.push(`${res.price}`)
        rows.push(`${res.time}`)
        rows.push(`${chalk.yellow(total.format('$0.00a'))}`)

        table.write(rows)
      },
      error: res => {
        websocket.complete()
        stream()
      }
    })

  return next(websocket)
}

stream()
