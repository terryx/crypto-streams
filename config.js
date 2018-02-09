const { merge } = require('lodash')

const common = {}

const dev = {
  amount: 10000
}

const stg = {

}

const prd = {
  amount: 100000
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
