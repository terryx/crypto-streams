const { Observable } = require('rxjs')
const Gdax = require('gdax')
const moment = require('moment')
const chalk = require('chalk')
const Table = require('table')
const { argv } = require('yargs')
const format = require('../utils/format')
const config = require('../config')(argv.env)
const numeral = require('numeral')
const websocket = new Gdax.WebsocketClient(['BTC-USD', 'ETH-USD', 'BCH-USD', 'LTC-USD'])

const getTotal = (size, price) => {
  return numeral(size).multiply(numeral(price).value())
}

const stream = () => {
  const table = Table.createStream({
    border: Table.getBorderCharacters(`norc`),
    columnDefault: {
      width: 10
    },
    columnCount: 6,
    columns: {
      0: {
        width: 4
      },
      1: {
        width: 20
      }
    }
  })

  const volume = {
    btc: numeral(0),
    eth: numeral(0),
    bch: numeral(0),
    ltc: numeral(0)
  }
  return Observable
    .fromEvent(websocket, 'message')
    .filter(res => res.type === 'received')
    .filter(res => getTotal(res.size, res.price).value() >= config.gdax.filterAmount)
    .map(res => {
      const side = res.side.toUpperCase()
      const total = getTotal(res.size, res.price)
      const currency = res.product_id.substr(0, 3).toLowerCase()
      const product = format.currency(currency)
      const rows = []

      if (side === 'BUY') {
        volume[currency].add(total.value())
        rows.push(chalk.green(side))
      }

      if (side === 'SELL') {
        volume[currency].subtract(total.value())
        rows.push(chalk.red(side))
      }

      rows.push(`${res.size} ${product}`)
      rows.push(`${numeral(res.price).format('$0.0000')}`)

      if (total.value() >= config.gdax.alertAmount) {
        rows.push(chalk.yellowBright(total.format('$0.0a')))
      } else {
        rows.push(total.format('$0.0a'))
      }

      rows.push(`${moment(res.time).format('h:mm:ss A')}`)

      if (volume[currency].value() > 0) {
        rows.push(`${chalk.green(volume[currency].format('$0.0a'))}`)
      } else {
        rows.push(`${chalk.red(volume[currency].format('$0.0a'))}`)
      }

      table.write(rows)
    })
    .subscribe({
      next: res => {},
      error: res => console.log(res)
    })
}

stream()
