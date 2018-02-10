const { merge } = require('lodash')

const common = {}

const dev = {
  gdax: {
    filterAmount: 10000,
    alertAmount: 100000
  },
  okex: {
    btc: {
      amount: 100000
    },
    ltc: {
      amount: 100000
    },
    eth: {
      amount: 100000
    },
    etc: {
      amount: 100000
    },
    bch: {
      amount: 100000
    },
    xrp: {
      amount: 1000
    }
  }
}

const stg = {

}

const prd = {
  gdax: {
    filterAmount: 100000,
    alertAmount: 1000000
  },
  okex: {
    BTC: {
      amount: 10000000
    },
    LTC: {
      amount: 1000000
    },
    ETH: {
      amount: 1000000
    },
    ETC: {
      amount: 100000
    },
    BCH: {
      amount: 100000
    },
    XRP: {
      amount: 100000
    }
  }
}

module.exports = (env) => {
  switch (env) {
    case 'dev':
      return merge(dev, common)
    case 'stg':
      return merge(stg, common)
    case 'prd':
      return merge(prd, common)
    default:
      return merge(dev, common)
  }
}
