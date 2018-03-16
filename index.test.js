const test = require('ava')
const index = require('./index')

test('stream BTC - USD', t => {
  const subject = index.usd('btc')
  subject.connect()

  return subject
    .first()
    .map(res => {
      t.is(res === Number.NaN, false)
    })
})

test('stream BTC - USDT', t => {
  const subject = index.usdt('btc')
  subject.connect()

  return subject
    .first()
    .map(res => {
      t.is(res === Number.NaN, false)
    })
})
