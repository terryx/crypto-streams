const test = require('ava')
const helper = require('./helper')

test('getTotal return sum value', t => {
  t.is(helper.getTotal(3, '100'), 300)
  t.is(helper.getTotal(3, '-100'), -300)
  t.is(helper.getTotal(3, -100), -300)
})
