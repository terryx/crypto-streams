const numeral = require('numeral')

const getTotal = (size, price) => {
  return numeral(size).multiply(numeral(price).value()).value()
}

module.exports = { getTotal }
