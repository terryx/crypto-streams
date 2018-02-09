const { Observable } = require('rxjs')
const Gdax = require('gdax')
const numbro = require('numbro')
const moment = require('moment')
const chalk = require('chalk')
const { argv } = require('yargs')
const config = require('./config')(argv.env)
const websocket = new Gdax.WebsocketClient(['BTC-USD', 'ETH-USD', 'BCH-USD', 'LTC-USD'])

const getTotal = (size, price) => {
  return numbro(size).multiply(numbro(price))
}

Observable
  .fromEvent(websocket, 'message')
  .filter(res => res.type === 'received')
  .filter(res => getTotal(res.size, res.price) >= config.amount)
  .subscribe({
    next: res => {
      const side = res.side.toUpperCase()
      const total = getTotal(res.size, res.price).format('$0.0a')
      const text = []

      if (side === 'BUY') {
        text.push(`${chalk.green(side)} `)
      }

      if (side === 'SELL') {
        text.push(`${chalk.red(side)}`)
      }

      text.push(`${res.product_id.substr(0, 3)}`)
      text.push(`for ${total}`)
      text.push(`at ${moment(res.time).format('HH:mm:ss A')}`)

      console.log(text.join(' '))
    },
    error: res => console.log(res)
  })
