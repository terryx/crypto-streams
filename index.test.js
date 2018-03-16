const test = require('ava')
const index = require('./index')

const subject = index.usd('btc')
subject.connect()

test('stream BTCUSD', t => {
  return subject
    .first()
    .map(res => {
      t.is(res === Number.NaN, false)
    })
})
