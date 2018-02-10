const chalk = require('chalk')

const currency = (input) => {
  input = input.toUpperCase()

  switch (input) {
    case 'BTC':
      return chalk.yellowBright(input)
    case 'ETH':
      return chalk.hex('#43A047')(input)
    case 'BCH':
      return chalk.yellow(input)
    case 'LTC':
      return chalk.hex('#EEEEEE')(input)
    default:
      return input
  }
}

module.exports = { currency }
